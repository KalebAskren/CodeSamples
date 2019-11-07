//Kaleb Askren
//multithread to find prime values


#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>
#include <stdlib.h>
#include <stdbool.h>
bool isprime(int);
void *primes(void*);
double time1();
//unused mutex
pthread_mutex_t m;

int numprimes[4] = {0, 0, 0, 0};
int numthreads, ranges[8];



int main(int argc, char *argv[])
{
	alarm(90);
	double t1, t2;
	t1 = time1(); 
	
	pthread_t thrdid[4];

	if(strcmp(argv[1], "-hw") == 0)
		{
			printf("hello world\n");
			return -1;
		}
	
	if(argc == 1)
	{
		printf("No ranges input\n");
		return -1;
	
	}
	
	
	numthreads = (argc- 1)/2;
	for(int i = 0; i< argc - 1; i++)
	{
		ranges[i] = atoi(argv[i+1]);
	}

	int rc;
	int ids[4];

	//create the threads
	for(int i = 0; i <numthreads; i++)
	{
		ids[i] = i;
		rc = pthread_create(&thrdid[i], NULL, primes , (void *)&ids[i]);	
	}
	
	for(int i = 0; i < numthreads; i++)
	{
		pthread_join(thrdid[i], NULL);
	}

	
	//end clock
	t2 = time1();	
	//output
	printf("%lf", t2-t1);
	int totalprimes = 0;
	for(int i = 0; i <numthreads; i++)
	{
		totalprimes += numprimes[i];

	}
	printf(" %d", totalprimes);
	for(int i = 0; i < numthreads; i++)
	{
		printf(" %d", numprimes[i]);
	}
	printf("\n");
}
void *primes(void *arg)
{
	int thrnum = *((int*) arg);
	int rangestart;
	
	rangestart = ranges[thrnum *2];

	for(int i = rangestart; i <= ranges[thrnum*2 + 1]; i++)
	{
		//here we test for primes
		if(i != 1)
		{
			if(isprime(i) == true)
			{
				numprimes[thrnum] += 1;
	
			
			}
		}
	

		
	}
	
}
//test if a given number is prime
bool isprime(int n)
{
	if(n == 2 || n == 3)
	{
		return true;
	}
	if(n % 2 == 0 || n %3 ==0)
	{
		return false;
	}


	int x = 5, w = 2;
	for(x; x*x <= n; x +=6)
	{
		if(n%x == 0 || n%(x+w) == 0)
			return false;

		
	}
	return true;
}
