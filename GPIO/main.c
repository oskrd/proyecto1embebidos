#include "gpio.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

void pinMode(int pin, char* MODE) {

    //Inicialización del pin
    if (pin < 1 || pin > 40) {
        return;
    }

    FILE *fp;
    fp = fopen("/sys/class/gpio/export", "a");
    fprintf(fp, "%d", pin);
    fclose(fp);

    //Escribe el modo del pin elegido
    FILE *fp2;
    char str[50] = "/sys/class/gpio/gpio";
    char aInt[2];

    snprintf(aInt, 3, "%d", pin);
    strcat(str, aInt);
    strcat(str, "/direction");
    printf("%s\n", str);

    fp2 = fopen(str, "w");

    if (MODE == "OUTPUT") {
        char x[3] = "out";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
    } else if (MODE == "INPUT") {
        char x[2] = "in";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
    }

    fclose(fp2);
}

void digitalWrite(int pin, int value) {
    FILE *fp;

    if (pin < 1 || pin > 40) {
        return;
    }

    char str[35] = "/sys/class/gpio/gpio";
    char aInt[2];
    snprintf(aInt, 3, "%d", pin);
    strcat(str, aInt);
    strcat(str, "/value");

    printf("%s\n", str);

    fp = fopen(str, "w");
    if (value == 0 || value == 1) {
        fprintf(fp, "%d", value);
    }
    fclose(fp);

}

int digitalRead(int pin) {
    FILE *fp;
    char str[35] = "/sys/class/gpio/gpio";
    char aInt[2];
    char value[2];

    snprintf(aInt, 3, "%d", pin);
    strcat(str, aInt);
    strcat(str, "/value");

    printf("%s\n", str);
    fp = fopen(str, "r");
    if (fp != NULL) {
        fread(value, 2, 1, fp);
        printf("%s\n", value);
        fclose(fp);
        return atoi(value);
    } else {
        return -1;
    }
}

void pinUnload(int pin) {

    FILE *fp;
    fp = fopen("/sys/class/gpio/unexport", "a");
    fprintf(fp, "%d", pin);
    fclose(fp);
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
    //  pinMode(5, "INPUT");
    // digitalWrite(5,1);
    // sleep(1);
    // digitalWrite(7,0);
    // sleep(1);
    // int x5 = digitalRead(4);
    //digitalWrite(40,1);
    //sleep(0.1);
    //digitalRead(40);

    return 0;
}