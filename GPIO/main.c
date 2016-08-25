#include "gpio.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

void pinMode(int pin, bool MODE) {
    FILE *fp;
    fp= fopen("/sys/class/gpio/export", "a");
    fputc(pin, fp);
    fclose(fp);

    FILE *fp2;
    char str[80];
    
    strcat(str, "/sys/class/gpio/gpio");
    strcat(str, "17");
    strcat(str, "/direction");

    fp2= fopen(str, "a");
    if (MODE == true){
        fputc(atoi("in"), fp2);
    }else{
        fputc(atoi("out"), fp2);
    }
    fclose(fp);

}

void digitalWrite(int pin, bool value) {

}

bool digitalRead(int pin) {

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

int main(){
    return 0;
}