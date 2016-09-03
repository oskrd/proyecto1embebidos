#include <gpio.h>
#include <stdio.h>
#include <unistd.h>

int main()
{
    pinMode(3, "OUTPUT");
/*    pinMode(3, "OUTPUT");
	pinMode(4, "INPUT");
	printf("Declarando GPIO 2 y 3 como salidas y el 4 como entrada\n");
    printf("Blink para el GPIO3\n");
    blink(3, 10, 5);
    printf("Enciendo y apago dos veces el GPIO2\n");
    digitalWrite(2,0);
	sleep(1);
    digitalWrite(2,1);
	sleep(1);
    digitalWrite(2,0);
	sleep(1);
    digitalWrite(2,1);
	sleep(1);
	printf("Leyendo el pin 2\n");
	int value = 0;
	value = digitalRead(4);
	printf("El valor es: %d\n", value);
	pinUnload(2);
	pinUnload(3);
	pinUnload(4);*/
    digitalWrite(3,0);
	sleep(5);
	pinUnload(3);
    return 0;
}
