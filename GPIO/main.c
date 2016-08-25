#include "gpio.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

void pinMode(int pin, char* MODE) {
    
    //Inicialización del pin
    FILE *fp;
    fp = fopen("/sys/class/gpio/export", "a+");
    fprintf(fp, "%d", pin);
    fclose(fp);

    //Escribe el modo del pin elegido
    FILE *fp2;
    char str[50] = "/sys/class/gpio/gpio";
    char aInt[2];

    snprintf(aInt, 15, "%d", pin);

    strcat(str, aInt);
    strcat(str, "/direction");
    printf("%s\n", str);

    fp2 = fopen(str, "a");

    if (MODE == "OUTPUT") {
        char x[3] = "out";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
    } else if (MODE == "INPUT") {
        char x[2] = "in";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
    } else {
        //MODO DESCONOCIDO
    }

    fclose(fp2);

}

void digitalWrite(int pin, int value) {
    FILE *fp;
    char str[35] = "/sys/class/gpio/gpio";
    char aInt[15];
    snprintf(aInt, 15, "%d", pin);

    //strcat(str, "/sys/class/gpio/gpio");
    strcat(str, aInt);
    strcat(str, "/value");

    fp = fopen(str, "a");
    if (value == 0 || value == 1) {
        fwrite(&value, sizeof (value), sizeof (value) / sizeof (value), fp);
    } else {
        //MODO DESCONOCIDO
    }
    fclose(fp);

}

int digitalRead(int pin) {
    FILE *fp;
    char str[35] = "/sys/class/gpio/gpio";
    char aInt[15];
    char value[5];
    snprintf(aInt, 15, "%d", pin);

    //strcat(str, "/sys/class/gpio/gpio");
    strcat(str, aInt);
    strcat(str, "/value");

    fp = fopen(str, "r");
    fread(value, 5, 1, fp);
    printf("%s\n", value);
    fclose(fp);
    return atoi(value);
}

void blink(int pin, int freq, int duration) {
    int i = 0;
    int timediv = 1 / (2 * freq);
    pinMode(pin, "INPUT");
    while (i < duration) {
        digitalWrite(pin, 1);
        sleep(timediv);
        digitalWrite(pin, 0);
        sleep(timediv);
        i += timediv * 2;
    }

}

int main() {
    //blink(5, 4, 10);
    pinMode(5, "INPUT");
 //   digitalWrite(5,1);
    sleep(2);
 //   digitalWrite(5,0);
    return 0;
}