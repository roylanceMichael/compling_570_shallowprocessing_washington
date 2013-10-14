#! /bin/bash

while read line

do 
  echo -e "$line\n" | carmel -slik 1 $1

done < $2 


