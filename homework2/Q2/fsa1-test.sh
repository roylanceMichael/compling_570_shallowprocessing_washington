echo '"a" "b"' | carmel -sli fsa1
echo '"a"' | carmel -sli fsa1
echo '"b"' | carmel -sli fsa1
echo '"a" "a" "a" "b"' | carmel -sli fsa1
echo '"a" "a" "a"' | carmel -sli fsa1
echo '"a" "b" "b" "b"' | carmel -sli fsa1
echo 'this should fail:'
echo '""' | carmel -sli fsa1
echo '"a" "b" "a"' | carmel -sli fsa1 #should be invalid