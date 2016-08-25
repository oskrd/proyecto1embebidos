#include "gpio.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

void pinMode(int pin, int MODE) {

    FILE *fp;
    fp = fopen("/sys/class/gpio/export", "a");
    fputc(pin, fp);
    fclose(fp);

    FILE *fp2;
    char str[35];
    char aInt[15];
    snprintf(aInt, 15, "%d", pin);

    strcat(str, "/sys/class/gpio/gpio");
    strcat(str, aInt);
    strcat(str, "/direction");

    fp2 = fopen(str, "a");
    if (MODE == 1) {
        char x[2] = "in";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
    } else if (MODE == 0) {
        char x[3] = "out";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
    } else {
        //MODO DESCONOCIDO
    }
    fclose(fp2);
}

void digitalWrite(int pin, int value) {
    FILE *fp;
    char str[35];
    char aInt[15];
    snprintf(aInt, 15, "%d", pin);

    strcat(str, "/sys/class/gpio/gpio");
    strcat(str, aInt);
    strcat(str, "/value");

    fp = fopen(str, "a");
    if (value == 0 || value == 1) {
        fwrite(value, sizeof (value), sizeof (value) / sizeof (), fp);
    } else {
        //MODO DESCONOCIDO
    }
    fclose(fp);

}

int digitalRead(int pin) {

}

void blink(int pin, int freq, int duration) {
    int i = 0;
    int timediv = 1 / (2 * freq);

    while (i < duration) {
        digitalWrite(pin, 1);
        sleep(timediv);
        digitalWrite(pin, 0);
        sleep(timediv);
        i += timediv * 2;
    }

}

int main() {
    return 0;
}