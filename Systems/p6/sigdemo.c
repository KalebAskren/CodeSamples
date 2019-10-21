#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

void handler(int signum)
{
    printf("handler called with signum=%d\n",signum);
}

int main(int argc, char *argv[])
{
    int cpid, status;

    printf("pid %d\n",getpid());
    signal(SIGFPE,handler);
    signal(SIGSEGV,handler);
    signal(SIGCHLD,handler);
    // signal(SIGINT,handler);
    // signal(SIGKILL,handler);
    cpid = fork();
    if (cpid)
    {
        wait(&status);
        printf("child status %d\n",status);
    }
    else
    {
        sleep(5);
        printf("child ending\n");
        exit(0);
    }
    for (;;)
        ;
    return 0;
}
