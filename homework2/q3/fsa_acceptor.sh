#!/bin/sh
regex='Empty or invalid result of composition with transducer'

cat $2 | while read line; do
	fsaResult=$(echo $line | carmel -sli $1 2>&1)
	if [[ $fsaResult =~ $regex ]]; then
		echo "$line => no"
	else
		echo "$line => yes"
	fi
done