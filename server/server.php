<?php
/*
  Developed by farhad mehryari
  web : farhad-m.ir
  web : mrfarhad.ir
  telegram : @mrfarhad7
  email : farhadmehryari@gmail.com
*/
include "PhpWebSocket.class.php";
class core
{
	static $clients;
}
$host="127.0.0.1";
$port=8800;
$Server = new PHPWebSocket();
$Server->bind('message', 'wsOnMessage');
$Server->bind('open', 'wsOnOpen');
$Server->bind('close', 'wsOnClose');
$Server->wsStartServer($host, $port);

function wsOnMessage($clientID, $message, $messageLength, $binary)
{
	global $Server;
	$data=explode("**",$message);
	$f=$data[0];
	$t=$data[1];
	switch ($f) {
		case 'save_name':
			core::$clients[$clientID]=$t;
			if ( sizeof($Server->wsClients) > 1 )
			{
				foreach ( $Server->wsClients as $id => $c )
					if ( $id != $clientID )
						$Server->wsSend($id, "new_join**$t");

				foreach(core::$clients as $cID=>$name)
				{
					if ($cID!=$clientID)
					$Server->wsSend($clientID, "online_list**$name");
				}
			}
		break;
		case 'new_message' :
		if ( sizeof($Server->wsClients) > 1 )
		{
			foreach ( $Server->wsClients as $id => $c )
				if ( $id != $clientID )
					$Server->wsSend($id, "new_message**".core::$clients[$clientID]."**$t");
		}
		break;
	}

	$ip = long2ip( $Server->wsClients[$clientID][6] );
	$Server->log( "$ip ($clientID) said : $message." );


}

function wsOnOpen($clientID)
{
	core::$clients[$clientID]=0;
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );
	$Server->log( "$ip ($clientID) has connected." );
}

function wsOnClose($clientID, $status) {

	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );
	$Server->log( "$ip ($clientID) has disconnected." );

}
//Developed By Farhad Mehryari
