echo '""' | carmel -sli fsa2
echo '"a" "b"' | carmel -sli fsa2
echo '"a"' | carmel -sli fsa2
echo '"a" "a" "a" "b"' | carmel -sli fsa2
echo '"a" "a" "a"' | carmel -sli fsa2
echo '"a" "b" "b" "b"' | carmel -sli fsa2
echo 'this should fail:'
echo '"b"' | carmel -sli fsa2 # should fail
echo '"a" "b" "a"' | carmel -sli fsa2 #should be invalid