#!/bin/sh

# populate putdata with tab-delimited data
# then run this

python putlol.py > out
gnuplot plotit.plot
