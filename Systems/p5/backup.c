#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <errno.h>

#define BUFFER_LEN           1024    
#define SERVER_ACK           "ACK_FROM_SERVER\n"


void server(void);
int setup_to_accept(int por);
int accept_connection(int accept_socket);
void serve_one_connection(int client_socket);
void client(char *server_host);
int connect_to_server(char *hostname, int port);
void send_msg(int fd, char *buf, int size);
int recv_msg(int fd, char *buf);
void error_check(int val, const char *str);
void put(char *, char*);
void get(char *);
void process(char *);
int NON_RESERVED_PORT;

//struct data{
	
//	char *key;
//	char *val;
//	struct data * next;
//	void displaycontents(){
//		printf("key: %s\n", key);
//		printf("value: %s\n", val);
//	}
//};

//struct data *head;
char *info[][100];

//void display(struct data*);

void main(int argc,char *argv[])
{
	if(strcmp(argv[1], "-hw") == 0)
	{
		printf("hello world\n");
		exit(1);
	}
	else
		printf("PID: %d\n", getpid()); 

	NON_RESERVED_PORT = atoi(argv[1]);
	
	printf("%d\n", NON_RESERVED_PORT); 


//	put("first", "atest");
//
//	put("second", "yett", 10);
//
//	get("first");
//	get("second");

//        printf("calling server\n");
        server();
        printf("back from server\n");
}

void server()
{
    int rc, accept_socket, client_socket;

    accept_socket = setup_to_accept(NON_RESERVED_PORT);
    for (;;)
    {
        client_socket = accept_connection(accept_socket);
        serve_one_connection(client_socket);
    }
}

void serve_one_connection(int client_socket)
{
    int rc, ack_length;
    char buf[BUFFER_LEN];

    ack_length = strlen(SERVER_ACK)+1;
    rc = recv_msg(client_socket, buf);    
    buf[rc] = '\0';
    while (rc != 0)
    {
	
    	//printf("%s", buf);
	process(buf);
        //printf("server received %d bytes  :%s: \n",rc,buf);
        send_msg(client_socket, (char *)SERVER_ACK, ack_length);
        rc = recv_msg(client_socket, buf);    
        buf[rc] = '\0';
    }
    close(client_socket);
}


int setup_to_accept(int port)    
{
    int rc, accept_socket;
    int optval = 1;
    struct sockaddr_in sin;

    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(port);

    accept_socket = socket(AF_INET, SOCK_STREAM, 0);

    setsockopt(accept_socket,SOL_SOCKET,SO_REUSEADDR,(char *)&optval,sizeof(optval));

    rc = bind(accept_socket, (struct sockaddr *)&sin ,sizeof(sin));

    rc = listen(accept_socket, 5);

    return(accept_socket);
}

int accept_connection(int accept_socket)    
{
    struct sockaddr_in from;
    int fromlen, client_socket, gotit;
    int optval = 1;

    fromlen = sizeof(from);
    gotit = 0;
    while (!gotit)
    {
        client_socket = accept(accept_socket, (struct sockaddr *)&from,
                               (socklen_t *)&fromlen);
        if (client_socket == -1)
        {
            /* Did we get interrupted? If so, try again */
            if (errno == EINTR)
                continue;
        }
        else
            gotit = 1;
    }
    setsockopt(client_socket,IPPROTO_TCP,TCP_NODELAY,(char *)&optval,sizeof(optval));
    return(client_socket);
}


int recv_msg(int fd, char *buf)
{
    int bytes_read;

    bytes_read = read(fd, buf, BUFFER_LEN);
	
    return( bytes_read );
}

void send_msg(int fd, char *buf, int size)    
{
    int n;

    n = write(fd, buf, size);
}

void put(char * key, char * val)
{
	if(head == NULL)
	{
		head = (struct data*)malloc(sizeof(struct data));
		head->key = key;
		head->val = val;
		head->next = NULL;
	}
	else{
	struct data* current = head;

	while(current->next != NULL)
	{
		current = current->next;

	}
	

	current->next = (struct data*)malloc(sizeof(struct data));
	
	printf("Putting key: %s \n", key);
	current->next->key = key;

	printf("Putting value : %s \n", val);
	current->next->val = val;
	printf("Put Value: %s", current->next->val);	

	}

}
void get(char *key)
{
	struct data* current = head;
	while(current->next != NULL)
	{
		printf("key: %s\n", current->key);
		printf("val: %s\n", current->val);
		current = current->next;
	}
	if(strcmp(current->key, key) == 0)
		display(current);
	else
		printf("failed\n");
}

void process(char *buf)
{
	char  *cmd = strtok(buf, " ");
	char  *key = strtok(NULL, " ");
	char  *val = strtok(NULL, " ");
	if(strcmp(cmd, "put") == 0)
	{
		printf("%s %s %s\n", cmd, key, val);
		put(key, val);
	}
	else{
		printf("%s %s\n", cmd, key);
		get(key);
	}
}
void display(struct data* cur)
{
	//printf("Key: %s", cur->key);
	//printf("\n");
	//printf("val: %s", cur->val);
	//printf("\n");
}
