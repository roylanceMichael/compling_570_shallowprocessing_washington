echo '""' | carmel -sli fsa3
echo '"a" "b"' | carmel -sli fsa3
echo '"a"' | carmel -sli fsa3 # should be invalid
echo '"b"' | carmel -sli fsa3 
echo '"a" "a" "a" "b"' | carmel -sli fsa3
echo '"a" "a" "a"' | carmel -sli fsa3
echo '"a" "b" "b" "b"' | carmel -sli fsa3
echo 'this should fail:'
echo '"a" "b" "a"' | carmel -sli fsa3 #should be invalid