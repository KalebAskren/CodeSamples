//Kaleb Askren
//Introduction to Computer Systems
//Dr. Ralph Butler
//Project 6


#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <errno.h>
#include <signal.h>

int usrcount;
void handler1(int signum)
{
	printf("received SIGUSR1\n");
	usrcount++;
}
void handler2(int signum)
{
	printf("received SIGUSR2\n");
	exit(1);
}
int main(int argc, char *argv[])
{
	alarm(90);
	//hello world check
	if(argc >1)
	{
		if(strcmp(argv[1], "-hw") == 0)
		{
			printf("hello world\n");
			exit(0);
		}
	}
	usrcount = 0;
	//set up signal recievers
	signal(SIGUSR1, handler1);
	signal(SIGUSR2, handler2);

	//printf("MY pid = : %s\n", getpid());

	for(;;)
	{
		if(usrcount > 3)
		{
			printf("terminating due to 4 SIGUSR1 signals\n");
			exit(1);
		}
		sleep(1);

	}


	return 0;
}
