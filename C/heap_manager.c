/*
Kaleb Askren
make a mock heap-manager with linked lists
*/
#include <sys/mman.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
struct node{
	void*  start;
	int numsize;
	int numtaken;	
	struct node* next;
	struct node* previous;

};
struct node *head;
int totalavailable, totaltaken;
void heap_init(int n)
{

	//n is the number of pages to allocate
	//get the page size
	int pgsz = getpagesize();
	pgsz = pgsz * n;
	

	//alloc mem
	void *region;
	
	region = mmap(NULL, pgsz, PROT_READ | PROT_WRITE, MAP_ANONYMOUS | MAP_PRIVATE, -1, 0);
	head = (struct node*)malloc(sizeof(struct node));	
	head->start = region;
	head->numsize = 0;
	head->numtaken = 0;
	head->next = NULL;
	head->previous = NULL;
	totalavailable = pgsz;
	totaltaken = 0;

}

void *heap_alloc(int n)
{
if(n > (totalavailable- totaltaken))
	{
		return NULL;
	}
else
{

	if(n%16 != 0)
	{
		n = n + n%16;
	}
	int numtoalloc = n;
	
	if(head->numtaken == 0)
	{
		//alloc n at head
		head->numsize = head->numsize+ n;
		head->numtaken = head->numtaken + n;
		totaltaken += n;

		return head->start;

	}
	else
	{
	
		struct node * current = head;

		
		while(current->next != NULL)
		{
			if((current->numsize - current->numtaken) > numtoalloc)
			{
				//alloc at current.numsize - current.numtaken
				//break;
				int temp = current->numtaken;
				current->numsize = current->numsize +n;
				current->numtaken = current->numtaken +n;
				totaltaken += n;
				return (current->start + temp );
				
			}
			else
			{
				current= current->next;	
				
			}
			

		}
		if(current->next == NULL)
		{

			current->next = (struct node*)malloc(sizeof(struct node));
			current->next->numsize = n;
			current->next->numtaken = n;
			current->next->start = current->start + current->numsize;
			current->next->next = NULL;
			totaltaken += n;
			current->next->previous = current;
			current = current->next;	
			return current->start;
			
		}		
		}	
	}	
}

void heap_free(void* location)
{
	struct node * current;
	current = head;

	while(current->start != location)
	{
		current = current->next;
	}

	if(current->start == location)
	{
		//free this location
		//coalesce free blocks
		totaltaken -= current->numtaken;
		current->numtaken = 0;
		if(current->next->numtaken == 0)
		{
			current->numsize += current->next->numsize;
			
			current->next = current->next->next;
		}
		if(current->previous->numtaken == 0)
		{
			current->previous->numsize += current->numsize;
			current->previous->next = current->next;
		}
	}

}	
