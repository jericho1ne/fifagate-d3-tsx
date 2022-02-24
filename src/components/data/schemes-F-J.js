var schemeF = { 
	"nodes" : [
		["FIFA",			{"type": "Federation"}],
		["Traffic",			{"type": "Commercial", "notes": "Traffic + Traffic USA combined"}],
		["CFU",				{"type": "Federation"}],
		["Jack Warner",		{"type": "FIFA Member", "country": "Trinidad and Tobago"}],
	],
	"edges" : [
		["FIFA",  "CFU", {"type": "Basic", "label": ""}],

		["CFU",  "Jack Warner", {"type": "Basic", "label": ""}],

		["Traffic", "CFU", {"type": "Marketing", "label": "$900,000"}],
		["Traffic", "Jack Warner", {"type": "Kickback", "label": "$800,000"}],
		["Traffic", "Jack Warner", {"type": "Kickback", "label": "$40,000"}],
		["Traffic", "CFU", {"type": "Marketing", "label": "$2,200,000"}],
		["Traffic", "Jack Warner", {"type": "Kickback", "label": "$800,000"}],
		["Traffic", "Jack Warner", {"type": "Kickback", "label": "$40,000"}],
	]
}

var schemeG = { 
	"nodes" : [
		["FIFA", 				{"type": "Federation"}],
		["Morocco",				{"type": "Federation", "country": "Morocco"}],
		["Co-Conspirator #1",	{"type": "Co-Conspirator"}],
		["South Africa",  		{"type": "Federation", "country": "South Africa"}],
		["FIFA high ranking individual",	{"type": "FIFA Member"}],
		["CFU",					{"type": "Federation", "notes":"Including three legal FIFA payments diverted from South Africa to CFU accounts controlled by Warner as bribes. Money moved from Swiss account to New York accounts, to Trinidad and Tobago account."}],
		["Jack Warner",			{"type": "FIFA Member", "country": "Trinidad and Tobago"}],
	],
	"edges" : [
		["FIFA",  "Morocco", {"type": "Basic", "label": ""}],		
		["FIFA",  "CFU", {"type": "Basic", "label": ""}],			
		["FIFA",  "CFU", {"type": "Basic", "label": ""}],
		["FIFA",  "South Africa", {"type": "Basic", "label": ""}],
		
		// FIFA Satellite
		["FIFA", "FIFA high ranking individual", 	{"type": "Basic", "label": ""}],

		// Train tracks - not a kickback, it"s DEVELOPMENT - more bening color YELLOW
		["FIFA high ranking individual", "South Africa", {"type": "Sports Devt", "label": "$10,000,000"}],
		["FIFA high ranking individual", "CFU", {"type": "Kickback", "label": "$616,000"}],
		["FIFA high ranking individual", "CFU", {"type": "Kickback", "label": "$1,600,000"}],
		["FIFA high ranking individual", "CFU", {"type": "Kickback", "label": "$7,784,000"}],

		// CHANGE "TYPE" TO OFFERED BRIBE - horizontal slashes or dots
		["Morocco", "Co-Conspirator #1", {"type": "Offered Bribe", "label": "$1,000,000"}],
		["South Africa", "CFU", {"type": "Kickback", "label": ""}],

		["CFU", "Jack Warner", {"type": "Kickback", "label": "$200,000"}],
		["CFU", "Jack Warner", {"type": "Kickback", "label": "$1,400,000"}],
		["CFU", "Co-Conspirator #1", {"type": "Kickback", "label": "$298,500"}],
		["CFU", "Co-Conspirator #1", {"type": "Kickback", "label": "$205,000"}],
		["CFU", "Co-Conspirator #1", {"type": "Kickback", "label": "$250,000"}],
	]
};

// THIS NEEDS CLEANUP !!! 
var schemeH = { 
	"nodes" : [
		["FIFA",							{"type": "Federation"}],
		["Costa Rican Soccer Federation",	{"type": "Federation", "country": "Costa Rica"}],
		["Traffic",							{"type": "Commercial"}],	//, "country": "USA"
		["Eduardo Li",						{"type": "FIFA Member", "country": "Costa Rica"}],
		["Nicaraguan Soccer Federation",	{"type": "Federation", "country": "Nicaragua"}],
		["Julio Rocha",						{"type": "FIFA Member", "country": "Nicaragua"}],
		["Co-Conspirator #18",				{"type": "FIFA Member"}],
		["Co-Conspirator #4",				{"type": "Co-Conspirator"}],
		["Co-Conspirator #19",				{"type": "Co-Conspirator"}],
	],
	"edges" : [
		["FIFA",  "Costa Rican Soccer Federation", 			{"type": "Basic", "label": ""}],
		["FIFA",  "Nicaraguan Soccer Federation", 			{"type": "Basic", "label": ""}],
		["FIFA",  "Eduardo Li", 							{"type": "Basic", "label": ""}],
		["FIFA",  "Julio Rocha", 		{"type": "Basic", "label": ""}],

		["Traffic", "Costa Rican Soccer Federation", 	{"type": "Marketing", "label": "~$2,500,000"}],
		["Traffic", "Nicaraguan Soccer Federation", 	{"type": "Marketing", "label": "~$1,138,000"}],

		["Traffic", "Eduardo Li", 							{"type": "Kickback", "label": ""}],
		["Traffic", "Co-Conspirator #4", 					{"type": "Basic", "label": ""}],	
		
		["Traffic", "Julio Rocha", 							{"type": "Kickback", "label": "$150,000"}],
		["Traffic", "Julio Rocha", 							{"type": "Kickback", "label": "", ghost: "true"}],
		["Traffic", "Julio Rocha", 							{"type": "Kickback", "label": "", ghost: "true"}],
		["Traffic", "Co-Conspirator #19", 					{"type": "Kickback", "label": "$50,000"}],
		["Co-Conspirator #18", "Traffic", 					{"type": "Basic", "label": ""}],
		["Co-Conspirator #18", "Nicaraguan Soccer Federation", {"type": "Basic", "label": ""}],
		["Co-Conspirator #19", "Nicaraguan Soccer Federation", {"type": "Basic", "label": ""}],
	]
};


var schemeI = { 
	"nodes" : [
		["FIFA",				{"type": "Federation"}],
		["Co-Conspirator #7",	{"type": "FIFA Member", "country": "Qatar", "notes":"Mohamed Bin Hamman"}],
		["Jack Warner",			{"type": "FIFA Member", "country": "Trinidad and Tobago"}],
		["CFU members",			{"type": "FIFA Member"}],
	],
	"edges" : [
		["FIFA",  "Jack Warner", 				{"type": "Basic", "label": ""}],		
		["FIFA",  "CFU members", 				{"type": "Basic", "label": ""}],		

		["Co-Conspirator #7", "Jack Warner",	{"type": "Meeting/Travel", "label": "$363,537.98"}],

		["Jack Warner", "CFU members", 			{"type": "Kickback", "label": "$40,000"}],
		["Jack Warner", "CFU members", 			{"type": "Meeting/Travel", "label": "$40,000"}],
		["Jack Warner", "CFU members", 			{"type": "Kickback", "label": "$40,000"}],
		["Jack Warner", "CFU members", 			{"type": "Meeting/Travel", "label": "$40,000"}],
		["Jack Warner", "CFU members", 			{"type": "Kickback", "label": "$40,000"}],
		
		["Co-Conspirator #7", "Jack Warner", 	{"type": "Kickback", "label": "$1,211,980"}],
	]
};


// NEEDS CLEANUP - Should Company A remain a bank (Hong Kong)??
var schemeJ = { 
	"nodes" : [
		["FIFA",						{"type": "Federation"}],
		["Traffic USA",					{"type": "Commercial"}],		// , "country": "USA"
		["CFU",							{"type": "Federation"}],
		["Jeffrey Webb",				{"type": "FIFA Member", "country": "Cayman Islands", "notes": "Received swimming pool & realty payoffs from Takkas, plus hefty bribe for commercial rights for CFU 2018 and 2022 World Cup qualifiers."}],

		["Sports Marketing Co. C",	{"type": "Commercial"}],
		["Conspirator #13", 			{"type": "Co-Conspirator", "country": "USA", "country2": "Brazil" }],
		["Conspirator #20", 			{"type": "Co-Conspirator", "notes": "Senior executive of the European parent of Sports Marketing Company C"}],
		["Conspirator #21", 			{"type": "Co-Conspirator", "notes": "Senior executive of a U.S. subsidiary of Sports Marketing Company C"}],

		["Front Company A",				{"type": "Corporation"}],
		["Costas Takkas",				{"type": "FIFA Member", "country": "United Kingdom", "country2": "Cayman Islands", "notes":"Also includes the \"Unknown Co-Conspirator\", an acquaintance of Takkas\"."}],
		["Co-Conspirator #4",			{"type": "Co-Conspirator"}],
		["Co-Conspirator #22",			{"type": "Co-Conspirator"}],
		["Friend of Co-Conspirator #2",	{"type": "Co-Conspirator"}],
		["Sports Marketing Co. C",	{"type": "Commercial"}],
	],
	"edges" : [
		["FIFA", "CFU", 							{"type": "Basic", "label": ""}],				
		["CFU", "Jeffrey Webb", 					{"type": "Basic", "label": ""}],		
		["FIFA", "Costas Takkas", 					{"type": "Basic", "label": ""}],		
		["Traffic USA",  "Co-Conspirator #4", 		{"type": "Basic", "label": ""}],		

		["Traffic USA", "CFU", 						{"type": "Marketing", "label": "$23,000,000"}],
		["Traffic USA", "Jeffrey Webb", 			{"type": "Kickback", "label": "$3,000,000"}],
		
		["Sports Marketing Co. C", "Traffic USA", {"type": "Marketing", "label": "-"}],

		["Sports Marketing Co. C", "Conspirator #13", {"type": "Basic", "label": ""}],
		["Sports Marketing Co. C", "Conspirator #20", {"type": "Basic", "label": ""}],
		["Sports Marketing Co. C", "Conspirator #21", {"type": "Basic", "label": ""}],

		["Traffic USA", "Front Company A", 			{"type": "Kickback", "label": "$1,200,000"}],
		
		["Front Company A", "Costas Takkas", 		{"type": "Kickback", "label": "$750,000"}],
		["Front Company A", "Costas Takkas", 		{"type": "Kickback", "label": "$250,000"}],
		["Front Company A", "Co-Conspirator #22", 	{"type": "Kickback", "label": "$200,000"}],

		["Traffic USA", "Friend of Co-Conspirator #2", {"type": "Kickback", "label": "$500,000"}],
		["Friend of Co-Conspirator #2", "Costas Takkas", {"type": "Kickback", "label": "$500,000"}],
		["Costas Takkas", "Jeffrey Webb", 				{"type": "Kickback", "label": "-"}],
		["Costas Takkas", "Jeffrey Webb", 				{"type": "Kickback", "label": "-"}],
		["Sports Marketing Co. C", "Costas Takkas", {"type": "Kickback", "label": "-"}],		// formerly Unknown co-conspirator
	]
};

var schemeK = { 
	"nodes" : [
		["FIFA",					{"type": "Federation"}],
		["Traffic USA",				{"type": "Commercial"}],		//, "country": "USA"
		["CONCACAF",				{"type": "Federation"}],
		["Jeffrey Webb",			{"type": "FIFA Member", "country": "Cayman Islands"}], 
		["Co-Conspirator #2",		{"type": "Co-Conspirator"}],
		["Co-Conspirator #4",		{"type": "Co-Conspirator"}],	
		["Co-Conspirator #23",		{"type": "Co-Conspirator"}],
		["Aaron Davidson",			{"type": "Co-Conspirator", "country": "USA"}],
		// "Jeffrey Webb; Co-Conspirators #2",
		// "Traffic USA; ",
		["Soccer Uniform Company A", {"type": "Sportswear"}],//"Soccer Uniform Company A; Co-Conspirator #23",
	],
	"edges" : [
		["FIFA",  "CONCACAF", {"type": "Basic", "label": ""}],						
		["Traffic USA", "Aaron Davidson", {"type": "Basic", "label": ""}],			
		// ["CONCACAF",  "Jeffrey Webb", {"type": "Basic", "label": ""}],			
		["Co-Conspirator #2", "Traffic USA",  {"type": "Basic", "label": ""}],		
		// ["Traffic USA", "Co-Conspirator #4", {"type": "Basic", "label": ""}],	
		["CONCACAF", "Co-Conspirator #4", {"type": "Basic", "label": ""}],			
		["Soccer Uniform Company A", "Co-Conspirator #23", {"type": "Basic", "label": ""}],

		["Traffic USA", "CONCACAF", {"type": "Marketing", "label": "$15,500,000"}],
		["Traffic USA", "CONCACAF", {"type": "Marketing", "label": "$60,000,000"}],
		// ["Traffic USA", "Jeffrey Webb", {"type": "Kickback", "label": "-"}],		// sought and obtained
		["Traffic USA", "Soccer Uniform Company A", {"type": "Kickback", "label": "$1,100,000"}],  //; Co-Conspirator #23 for TO
		["Traffic USA", "Soccer Uniform Company A", {"type": "Kickback", "label": "$2,000,000"}],  //
		["Soccer Uniform Company A", "Jeffrey Webb", {"type": "Kickback", "label": "$1,100,000"}],  //; Co-Conspirator #23 for TO
		["Soccer Uniform Company A", "Jeffrey Webb", {"type": "Kickback", "label": "$2,000,000"}],  //
	]
};

// Needs cleanup baaad
var schemeL = { 
	"nodes" : [
		["FIFA",					{"type": "Federation"}],
		["Co-Conspirator #2",		{"type": "Co-Conspirator"}],	// (representing Traffic
		["CONMEBOL",				{"type": "Federation"}],
		["Datisan",					{"type": "Commercial", "notes": "Datisan paid massive bribe of $100,000,000 for 2013 Copa America contract.  Also secured worldwide, exclusive commercial rights to Copa America\"s 2015, 2016, 2019, and 2023 editions."}],
		["Traffic International",	{"type": "Commercial"}],			// , "country": "USA"
		["Cross Trading",			{"type": "Corporation", "country": "Argentina", "notes": "Full Play Group (soccer broadcasting company) affiliate.  Operated by Hugo and Mariano Jinkis."}],
		["FTP (Tornes Affiliate)",	{"type": "Corporation"}],
		["CONMEBOL officials",		{"type": "FIFA Member"}],
		["Bayan Group S.A.",		{"type": "Corporation", "country": "Panama", "notes": "Includes Bayan account controlled by Rafael Esquivel"}],
		["Rafael Esquivel",			{"type": "FIFA Member", "country": "Venezuela"}],
		["Jose Margulies",			{"type": "FIFA Member", "country": "Brazil", "notes": "Margulies Intermediaries"}],			 
		["CONCACAF",				{"type": "Federation", "notes": "Datisan seeks and obtains CONCACAF commercial rights for special 2016 Centenario Contract."}],
		["Jeffrey Webb",			{"type": "FIFA Member", "country": "Cayman Islands", "notes": "Datisan agrees to unspecified bribe payment to Webb for CONCACAF contract."}],
	],
	"edges" : [
		["FIFA",  "CONMEBOL", {"type": "Basic", "label": ""}],				
		["FIFA",  "CONCACAF", {"type": "Basic", "label": ""}],				

		["Datisan", "FTP (Tornes Affiliate)", {"type": "Basic", "label": ""}],				
		["Datisan", "Cross Trading",  {"type": "Basic", "label": ""}],				
		["Datisan", "Bayan Group S.A.",  {"type": "Basic", "label": ""}],				

		["CONMEBOL",  "Rafael Esquivel", {"type": "Basic", "label": ""}],				
		["CONMEBOL",  "CONMEBOL officials", {"type": "Basic", "label": ""}],
		["Traffic International",  "Co-Conspirator #2", {"type": "Basic", "label": ""}],				

		["Co-Conspirator #2", "CONMEBOL officials", {"type": "Kickback", "label": "$10,000,000"}],
		["Datisan", "CONMEBOL", {"type": "Marketing", "label": "$317,500,000"}],
		["Traffic International", "Cross Trading", {"type": "Kickback", "label": "$5,000,000"}],
		["Traffic International", "FTP (Tornes Affiliate)", {"type": "Kickback", "label": "$5,000,000"}],
		["Traffic International", "FTP (Tornes Affiliate)", {"type": "Kickback", "label": "$1,666,667"}],
		["Datisan", "Cross Trading", {"type": "Kickback", "label": "$1,667,000"}],
		["Datisan", "CONMEBOL officials", {"type": "Kickback", "label": "-"}],
		["Bayan Group S.A.", "Rafael Esquivel", {"type": "Kickback", "label": "$50,000"}],
		["Bayan Group S.A.", "Rafael Esquivel", {"type": "Kickback", "label": "$250,000"}],
		["Bayan Group S.A.", "Rafael Esquivel", {"type": "Kickback", "label": "$400,000"}],
		["Datisan", "Jose Margulies", {"type": "Kickback", "label": "$3,800,000"}],
		["Jose Margulies", "Bayan Group S.A.", {"type": "Kickback", "label": "$2,000,000"}],
		["Datisan", "CONCACAF", {"type": "Marketing", "label": "$35,000,000"}],
		["Datisan", "Jeffrey Webb", {"type": "Kickback", "label": "-"}],
	]
};
