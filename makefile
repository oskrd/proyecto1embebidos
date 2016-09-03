NO_PRINT = -s

all:
		@cd lib && make $(NO_PRINT)
		@cd src && make $(NO_PRINT)

clean:
		@cd lib && make clean $(NO_PRINT)
		@cd src && make clean $(NO_PRINT)
