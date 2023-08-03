<?php
function gen_identity($prevcode, $rand, $op)
{
    $newcode = "";

    if (($prevcode == "") || ($op == "") || ($rand == "")) {
        return "";
    }

    //Encode
    if ($op == "E") { //Encode
        $move = 0;
        $fill = chr($rand);
        $move = $rand - 65;
        $newcode = "";
        $cnt = strlen($prevcode);
        for ($c1 = 0; $c1 < $cnt; $c1++) {
            $subs = substr($prevcode, $c1, 1);
            $cval = ord($subs) - $move;
            $newcode = $newcode . chr($cval) . $fill;
        }
    } else if ($op == "D") { //Decode
        $move = $rand - 65;
        $newcode = "";
        $cnt = strlen($prevcode);

        $alter = true;
        for ($c1 = 0; $c1 < $cnt; $c1++) {
            $subs = substr($prevcode, $c1, 1);

            $cval = ord($subs) + $move;
            if ($alter) {
                $newcode = $newcode . chr($cval);
                $alter = false;
            } else {
                $alter = true;
            }
        }
    }

    return $newcode;
}



echo "\nNew passs=====" . gen_identity('B@BmBbBgBnBqB?BRBxBrBRBnBeBsB1B0B2B3B5B', '66', 'D') . "\n";
echo "\nNew passs=====" . gen_identity(',VYVNVSVZV]V+V>VdV^V>VZVQV_VV V$V', '86', 'D') . "\n";


