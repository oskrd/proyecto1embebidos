SRC = gpio.c
H = ../include/gpio.h
LIB = libgpio.so
OBJ = gpio.o
CFLAGS= -I../include

libgpio: $(SCR) $(H)
		@$(CC) -c $(SRC) $(CFLAGS) -fPIC
		@$(LD) -o $(LIB) $(OBJ) -shared
		@rm $(OBJ)
		@echo "export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/RUTA_ABSOLUTA/lib"
		@echo "Generando biblioteca dinamica para control de gpios"

clean:
		@rm *.so
		@echo "Eliminando bibliotecas"
