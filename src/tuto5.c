#include <gpio.h>
#include <stdio.h>
#include <unistd.h>

/*
* Programa de prueba para biblioteca gpio dinamica [libgpio.so]
*/
int main()
{
	pinMode(2, "OUTPUT");
	pinMode(3, "OUTPUT");
	pinMode(4, "INPUT");
	printf("Declarando GPIO 2 y 3 como salidas y el 4 como entrada\n");
	printf("Blink para el GPIO3\n");
	printf("Frecuencia de 10Hz, duracion de 5s\n");
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
	digitalWrite(2,0);
	sleep(1);
	printf("Leyendo el GPIO4\n");
	int value = 0;
	value = digitalRead(4);
	printf("El valor es: %d\n", value);
	pinUnload(2);
	pinUnload(3);
	pinUnload(4);
	return 0;
}
