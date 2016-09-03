SRC= tuto5.c
APP= tutorial_5
OUT= ../bin/$(APP)
CFLAGS= -I../include
LFLAGS= -L../lib -lgpio

$(APP): $(SRC)
		$(CC) -o $(OUT) $(SRC) $(LFLAGS) $(CFLAGS)

clean:
		@rm $(OUT)
		@echo "Eliminando ejecutable"
