//---------------------------------------------------------------
// The purpose is to introduce you to websockets
// This is a SERVER that is SEPARATE from the http server.
//
// Your webpage (in this case the index.html in this directory)
// will be SERVED by the http server. THEN, it will connect to the
// websocket server. Then - they will talk to each other!
//
// Note that in regular http - the server cannot initiate a conversation
// Here, the websocket server sends a message to the client browser.
//
// This example has THREE parts
// 1) The http server code (which is same as what we did earlier)
// 2) This code - this is the web socket server
// It prints what it got from client. It also sends a message to the
// client after every 1 second.
// 3) The html or client code. Note how it connects to the websocket
// and how it sends and receives messages
//
// To RUN THIS EXAMPLE
// First, run node httpServer.js on one terminal
// Next, run node 1_ws.js on another terminal
// Next, type localhost:4000/index.html on some browser
//
//---------------------------------------------------------------
var io = require('socket.io').listen(5000);

var characters =
	{
		/* Gud guise */
		'Merlin':
		{
			isBad: false,
			knows:
			[
				'Morgana',
				'Assassin',
				'Oberon',
				'Dark Helmet',
				'Dark Christmas Tree',
				'Knife Dude'
			]
		},
		'Percival':
		{
			isBad: false,
			knows:
			[
				'Merlin',
				'Morgana'
			]
		},
		'Sweaty-B':
		{
			isBad: false,
			knows: []
		},
		'Light Helmet':
		{
			isBad: false,
			knows: []
		},
		'Land-o\'-Lakes Lady':
		{
			isBad: false,
			knows: []
		},
		'Lady Dank':
		{
			isBad: false,
			knows: []
		},
		'Christmas Tree':
		{
			isBad: false,
			knows: []
		},
		'Good Lancelot':
		{
			isBad: false,
			knows: []
		},
		/* Bed guise */
		'Mordred':
		{
			isBad: true,
			knows:
			[
				'Morgana',
				'Assassin',
				'Dark Helmet',
				'Dark Christmas Tree',
				'Knife Dude'
			]
		},
		'Morgana':
		{
			isBad: true,
			knows:
			[
				'Mordred',
				'Assassin',
				'Dark Helmet',
				'Dark Christmas Tree',
				'Knife Dude'
			]
		},
		'Assassin':
		{
			isBad: true,
			knows:
			[
				'Mordred',
				'Morgana',
				'Dark Helmet',
				'Dark Christmas Tree',
				'Knife Dude'
			]
		},
		'Oberon':
		{
			isBad: true,
			knows:
			[
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet',
				'Dark Christmas Tree',
				'Knife Dude'
			]
		},
		'Dark Helmet':
		{
			isBad: true,
			knows:
			[
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Christmas Tree',
				'Knife Dude'
			]
		},
		'Dark Christmas Tree':
		{
			isBad: true,
			knows:
			[
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet',
				'Knife Dude'
			]
		},
		'Knife Dude':
		{
			isBad: true,
			knows:
			[
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet',
				'Dark Christmas Tree'
			]
		}
	};

var scenarios =
	[
		{
			players: 5,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Mordred',
				'Morgana'
			],
			assassin: 'Morgana',
			quests:
			[
				{
					send: 2,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 2,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				}
			]
		},
		{
			players: 6,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Mordred',
				'Morgana'
			],
			assassin: 'Morgana',
			quests:
			[
				{
					send: 2,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				}
			]
		},
		{
			players: 7,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Mordred',
				'Morgana',
				'Assassin'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 2,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 2
				},
				{
					send: 4,
					fail: 1
				}
			]
		},
		{
			players: 8,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Lady Dank',
				'Mordred',
				'Morgana',
				'Assassin'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 5,
					fail: 2
				},
				{
					send: 5,
					fail: 1
				}
			]
		},
		{
			players: 9,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Lady Dank',
				'Christmas Tree',
				'Mordred',
				'Morgana',
				'Assassin'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 5,
					fail: 2
				},
				{
					send: 5,
					fail: 1
				}
			]
		},
		{
			players: 10,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Lady Dank',
				'Christmas Tree',
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 5,
					fail: 2
				},
				{
					send: 5,
					fail: 1
				}
			]
		},
		{
			players: 11,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Lady Dank',
				'Christmas Tree',
				'Land-o\'-Lakes Lady',
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 3,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 4,
					fail: 2
				},
				{
					send: 5,
					fail: 1
				},
				{
					send: 6,
					fail: 2
				},
				{
					send: 7,
					fail: 1
				}
			]
		},
		{
			players: 12,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Lady Dank',
				'Christmas Tree',
				'Land-o\'-Lakes Lady',
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet',
				'Dark Christmas Tree'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 3,
					fail: 1
				},
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 4,
					fail: 2
				},
				{
					send: 5,
					fail: 1
				},
				{
					send: 6,
					fail: 2
				},
				{
					send: 7,
					fail: 1
				}
			]
		},
		{
			players: 13,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Lady Dank',
				'Christmas Tree',
				'Land-o\'-Lakes Lady',
				'Good Lancelot',
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet',
				'Dark Christmas Tree'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 5,
					fail: 2
				},
				{
					send: 6,
					fail: 1
				},
				{
					send: 7,
					fail: 2
				},
				{
					send: 7,
					fail: 1
				}
			]
		},
		{
			players: 14,
			characters:
			[
				'Merlin',
				'Percival',
				'Sweaty-B',
				'Light Helmet',
				'Lady Dank',
				'Christmas Tree',
				'Land-o\'-Lakes Lady',
				'Good Lancelot',
				'Mordred',
				'Morgana',
				'Assassin',
				'Dark Helmet',
				'Dark Christmas Tree',
				'Knife Dude'
			],
			assassin: 'Assassin',
			quests:
			[
				{
					send: 3,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 4,
					fail: 1
				},
				{
					send: 5,
					fail: 2
				},
				{
					send: 6,
					fail: 1
				},
				{
					send: 7,
					fail: 2
				},
				{
					send: 7,
					fail: 1
				}
			]
		}
	];
// sockets.on('disconnect')

function find(arr, predicate)
{
	for (var i = 0; i < arr.length; ++i)
	{
		if (predicate(arr[i]))
		{
			return i;
		}
	}
	return -1;
}

function rnd_byte()
{
	var chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8' ,'9', 'A', 'B', 'C', 'D', 'E', 'F' ];
	var rnd = Math.floor(Math.random() * 256);
	return chars[(rnd >> 4) & 0x0F] + chars[(rnd) & 0x0F]
}

function gen_uid()
{
	var len = [ 4, 2, 2, 2, 6 ];
	var result = '';
	
	for (var l = 0; l < len.length; ++l)
	{
		for (var i = 0; i < len[l]; ++i)
		{
			result += rnd_byte();
		}
		result += '-';
	}
	
	return result.substring(0, result.length - 1);
}

function scramble(arr)
{
	for (var i = 0; i < arr.length * 4; ++i)
	{
		var idxA = Math.floor(Math.random() * arr.length);
		var idxB = Math.floor(Math.random() * arr.length);
		
		var temp = arr[idxA];
		arr[idxA] = arr[idxB];
		arr[idxB] = temp;
	}
}

function pickKing()
{
	var i;
	do
	{
		i = Math.floor(Math.random() * connected.length);
	}
	while (connected[i].hasBeenKing);
	connected[i].hasBeenKing = true;
	return i;
}

var connected = [ ];
var gameRunning = false;
var names = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var currScenario = { scen: null, questHistory: null, quest: -1, rejectedQuests: 0 };

io.sockets.on('connection', function(socket) {
	if (!gameRunning)
	{
		var uid;
		uid = gen_uid();
		connected.push({ socket: socket, uid: uid, name: names[connected.length], character: undefined, hasBeenKing: false });
        socket.emit('numPlayersUpdated', connected.length);
	    socket.broadcast.emit('numPlayersUpdated', connected.length);
		
		socket.on('setName', function(name) {
			var obj = connected[find(connected, function (c) { return c.uid === uid; })];
			var oldName = obj.name;
			obj.name = name;
			// Tell others about name change
			socket.broadcast.emit('playerNameUpdated', { oldVal: oldName, newVal: name});
		});
		
		socket.on('startGame', function(content) {
			if (!gameRunning)
			{
				gameRunning = true;
				var scen = find(scenarios, function (scen) { return scen.players === connected.length; });
				if (scen == -1)
				{
					// Too few or too many players
					gameRunning = false;
          socket.emit('character', -1)
					return;
				}
				// Set scenario
				currScenario.scen = scenarios[scen];
				currScenario.questHistory = null;
				currScenario.quest = 0;
				currScenario.rejectedQuests = 0;
				// Assign people to characters and let them know
				scramble(connected);
				for (var i = 0; i < connected.length; ++i)
				{
					connected[i].character = currScenario.scen.characters[i];
					connected[i].socket.emit('character', connected[i].character);
				}
				// Find out who people know is who and tell them about it
				for (var i = 0; i < connected.length; ++i)
				{
					var knownPeople = { people: [], known: characters[connected[i].character].knows.slice() };
					for (var k = 0; k < knownPeople.known.length; ++k)
					{
						// Find person that is known
						var kIdx = find(connected, function(c) { return c.character === knownPeople.known[k]; });
						if (kIdx !== -1)
						{
							knownPeople.people.push(connected[kIdx].name);
						}
						else
						{
							knownPeople.known.splice(k, 1);
							--k;
						}
					}
					connected[i].socket.emit('knownPeople', knownPeople);
				}
				
				var kingIdx = pickKing();
				connected[kingIdx].socket.emit('king', { amIKing: true, msg: 'You are king, send ' + currScenario.scen.quests[currScenario.quest].send + ' people' });
				connected[kingIdx].socket.broadcast.emit('king', { amIKing: false, msg: connected[kingIdx].name + ' is king, they are selecting ' + currScenario.scen.quests[currScenario.quest].send + ' people' });
			}
		});
		socket.on('disconnect', function(content) {
			var idx = find(connected, function (connection) { return connection.uid === uid});
			connected.splice(idx, 1);
            socket.broadcast.emit('numPlayersUpdated', connected.length);
		});
	}
});
