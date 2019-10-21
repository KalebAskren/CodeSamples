/*
Kaleb Askren
Ralph Butler intro to computer systems
code : cs_p5
due 4-15-19
*/
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

struct data{
	
	char key[32];
	char val[32];
	struct data * next;
};

struct data *head;
void display(struct data*);

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


        server();
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
	
	process(buf);
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

void put(char key[32], char val[32])
{

	if(head == NULL)
	{
		head = (struct data*)malloc(sizeof(struct data));
		int i = 0;
		

		while(key[i] != '\0')
		{
			head->key[i] = key[i];
			i++;
		}
		head->key[i] = '\0';

		i = 0;
		while(val[i] != '\0')
		{
			head->val[i] = val[i];
			i++;
		}
		head->val[i] = '\0';

		head->next = NULL;
		
	}
	else{
		struct data * cur = head;
		while(cur->next != NULL)
		{
			cur = cur->next;
		}
		struct data * newnode;	
	       	newnode = (struct data*)malloc(sizeof(struct data));
		int i = 0;
		while(key[i] != '\0')
		{
			newnode->key[i] = key[i];
			i++;
		}
		newnode->key[i] = '\0';
		i = 0;
		while(val[i] != '\0')
		{
			newnode->val[i] = val[i];
			i++;
		}
		newnode->val[i] = '\0';
		newnode->next = NULL;
		cur->next = newnode;

	}
}

void get(char key[32])
{
	
	struct data* cur = head;
	while(cur != NULL)
	{
		
	
		if(strcmp(cur->key, key) == 0)
		{
			printf("%s %s\n", cur->key, cur->val);
			break;
		}
		if(cur->next == NULL)
		{
			printf("value does not exist\n");
			break;
		
		}
		else
			cur = cur->next;
	}
	
}


void process(char *buf)
{

	char cmd[4];
	char key[32];
	char val[32];
	int i = 0;
	while(buf[i] != ' ')
	{
		cmd[i] = buf[i];
		i++;
	}
	cmd[3] = '\0';
	i++;
	int count = 0;

	while(buf[i] != ' ')
	{
		if(buf[i] == '\n')
			break;
		key[count] = buf[i];
		i++;
		count++;

	}
	i++;
	key[count] = '\0';
	count = 0;
	if(strcmp(cmd, "put") == 0)
	{
		while(buf[i] != '\n')
		{
			val[count] = buf[i];
			i++;
			count++;

	
		}

		val[count] = '\0';
	
	
		printf("%s %s %s\n", cmd, key, val);
		put(key, val);
	}
	else{
		printf("get %s\n", key);
		get(key);
	}
}
void display(struct data* cur)
{
	printf("------------------\n");
	printf("Key: %s", cur->key);
	printf("\n");
	printf("val: %s\n", cur->val);
	printf("------------------\n");
}
