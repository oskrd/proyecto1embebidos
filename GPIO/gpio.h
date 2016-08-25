#include <stdbool.h>

void pinMode (int pin, bool MODE);
void digitalWrite(int pin, bool value);
bool digitalRead(int pin);
void blink(int pin, int freq, int duration);

