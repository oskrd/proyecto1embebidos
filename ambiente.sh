#! /bin/bash

tput clear
tput cup 2 23
tput rev
tput setaf 5
echo "Instrucciones de uso"
tput sgr0
echo ""
echo "1- Ejecutar ambiente para compilación cruzada con AVR:"
echo "   source /opt/poky/2.1.1/environment-setup-cortexa7hf-neon-vfpv4-poky-linux-gnueabi "
echo "2- Luego se puede ejecutar el makefile"
echo "   Se genera una biblioteca dinámica \"libgpio.so\" y un ejecutable \"tutorial_5\""
echo "3- Se debe hacer un \"export LD_LIBRARY_PATH=D_LIBRARY_PATH:/RUTA_ABSOLUTA/lib\" para la correcta utilización de la biblioteca"

exit
