//Kaleb Askren
//Introduction to computer systems
//project 1
//code: cs_p1

#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <ctype.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
int main(int argc, char *argv[])
{

	if(strcmp(argv[1],"-hw") == 0)
	{
		printf("hello world");
		return 0;
	}
	
	else
	{
		//open the file and do the thing
		
		int fd;
		fd = open(argv[1], O_RDONLY);
		
		printf("fd: %d", fd);
		unsigned char buff[1024];
		if(fd == NULL)
		{
			printf("Failed to open File");
			return(0);
		}
		int n;
		int count = 0;
		while((n = read(fd, buff, 16)) > 0)
		{
		buff[n] = '\0';			
	
		
		
		
			//print the current location
			printf("%08x", count);
			printf(":");
			//print hex representation of each byte
			printf(" ");
			for(int i = 0; i < 16; i ++)
			{
				if(i > n - 1 )
				{
					printf("  ");
				}
				else
				{
					printf("%02x", buff[i]);
				}
					i++;
				if(i > n -1)
				{
					printf("  ");
				}
				else
				{
					printf("%02x", buff[i]);
				}
				printf(" ");
			}	
			//print the characters only
			printf(" ");
			for(int i = 0; i < n; i++)
			{
				if(!(isprint(buff[i])))
				{
					printf(".");
				}
				else
				{
					printf("%c", buff[i]);
				}
		
			}
			printf("\n");			
			count = n+count;
		}		
			
			
		
			
		
		close(fd);	
		
	}
	return 0;
}
