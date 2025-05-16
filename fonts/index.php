<?php
// Return a 403 Forbidden error with a custom message
header("HTTP/1.0 403 Forbidden");
echo "Sorry, You Are Not Allowed to Access This Page";
exit;
