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
    // printf("%s\n", str);

    fp2 = fopen(str, "a");

    if (MODE == "OUTPUT") {
        char x[4] = "out";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
        printf("Ok load: %s\n", x);
    } else if (MODE == "INPUT") {
        char x[3] = "in";
        fwrite(x, sizeof (x[0]), sizeof (x) / sizeof (x[0]), fp2);
        printf("Ok load: %s\n", x);
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

    //  printf("%s\n", str);

    fp = fopen(str, "w");
    if (value == 0 || value == 1) {
        fprintf(fp, "%d", value);
        printf("Ok write: %d\n", value);
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

    // printf("%s\n", str);
    fp = fopen(str, "r");
    if (fp != NULL) {
        fread(value, 2, 1, fp);
        printf("Ok read: ");

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
    printf("Ok Unload\n");
    fclose(fp);
}

void blink(int pin, float freq, int duration) {
    printf("Starting blink\n");

    float i = 0;
    int pos = 1;
    float timediv = 1 / ((float) freq * 2.0);
    printf("Timediv: %f\n", timediv);
    while (1) {
        i += timediv;
        printf("i: %f\n", i);
        digitalWrite(pin, pos);

        //Si dura menos del tiempo establecido, no hay problema
        if (i <= duration) {
            sleep(timediv);
        } else {
            //Si se pasa del tiempo, se resta el intervalo para llegar a la duración máxima.
            printf("%f\n", duration - i + timediv);
            sleep(duration - i + timediv);
            break;
        }

        if (pos == 0) {
            pos = 1;
        } else {
            pos = 0;
        }

    }
    printf("End blink\n");
}

int main() {
    pinMode(2, "OUTPUT");
    blink(2, 1.0 / 6.0, 10);
    pinUnload(2);

    return 0;
}
