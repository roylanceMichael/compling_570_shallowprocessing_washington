#! /bin/bash

sh ./test.sh $1 $2 1>fn1 2>fn2
python2.7 cleanoutfst.py fn1 fn2
