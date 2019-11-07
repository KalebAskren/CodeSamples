//Kaleb Askren
//use a pipe to connect process

#include <sys/wait.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdbool.h>
#define _GNU_Source
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <ctype.h>

int main(int argc, char *argv[])
{
	//printf("total argc: %d", argc);
	
	//Dont forget the hello world!
	if(strcmp(argv[1], "-hw") == 0)
	{
		printf("hello world");
		return 0;
	}
	
	int rc, i;		//fork label
	int stdin_pipe_fds[2], stdout_pipe_fds[2];

	pipe(stdin_pipe_fds);
	pipe(stdout_pipe_fds);
	rc = fork();
	if(rc == -1)
	{
		printf("Fork operation failed...");
		exit(-1);
	}
	
	//Child Process
	if(rc == 0)
	{
		alarm(60);
		//HERE WE NEED TO PROCESS THE execve() SYSTEM CALL
		//FOR /usr/bin/sort
		
		close(stdin_pipe_fds[1]);


		close(0);
		dup(stdin_pipe_fds[0]);
		close(stdin_pipe_fds[0]);
		
		char buf[100];
		//temporary char array to hold each line coming through
		char *arguments[] = {"usr/bin/sort", argv[2], argv[3], argv[4], NULL};
		execve("/usr/bin/sort", arguments, NULL);



	}
	else	//parent
	{
		alarm(60);
		close(stdin_pipe_fds[0]);
		
		int fd;
		
		fd = open(argv[1], O_RDONLY);
		unsigned char buff[1024];
		if(fd < 0)
		{
			printf("failed to open file");
			return 0;
		}

		int n;
		int count = 0, index = 0;
		unsigned char tempbuff[1024];


		n = read(fd, buff, 1026);
		buff[n] = '\0';

		for(int i = 0; i < n; i++)
		{
			if(buff[i] != '\n')
			{
				tempbuff[index] = buff[i];

				index++;
			}
			else
			{
				tempbuff[index] = '\n';
				if(strstr(tempbuff, "foobar")== NULL)
					write(stdin_pipe_fds[1], tempbuff, index +1);
				for(int j = 0; j <i; j++)
					tempbuff[j] = '\0';
				
				index = 0;
			}
			
		}		
			
		close(stdin_pipe_fds[1]);
	}
		





	return 0;
}
