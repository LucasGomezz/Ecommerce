CREATE DATABASE tallerWebDos;

USE tallerWebDos;

CREATE TABLE Generos (
    nombre VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    genero VARCHAR(255),
    precio DECIMAL(10, 2),
    imagen VARCHAR(255),
    imagenHorizontal VARCHAR(255),
    clasificacion INT,
    FOREIGN KEY (genero) REFERENCES Generos(nombre)
);

INSERT INTO Generos (nombre) VALUES ('Multiplayer');
INSERT INTO Generos (nombre) VALUES ('Battle Royale');
INSERT INTO Generos (nombre) VALUES ('Deportes');
INSERT INTO Generos (nombre) VALUES ('Shooter');

INSERT INTO Productos (nombre, descripcion, genero, precio, imagen, imagenHorizontal, clasificacion) VALUES
('PUBG', 'Forma equipo y participa en los campos de batalla para experimentar el Battle Royale original como solo existe en PUBG: BATTLEGROUNDS', 'Battle Royale', 10, 'assets/img/BattleRoyal/PubgVertical.jpg', 'assets/img/BattleRoyal/PubgHorizontal.jpg', 5),
('Tony Hawk s', 'Juega a los juegos Tony Hawk totalmente remasterizados en una épica colección hecha desde cero en alta definición.', 'Deportes', 33, 'assets/img/Deportes/TonyHVertical.jpg.jpg', 'assets/img/Deportes/TonyHHorizontal.jpg', 5),
('Rocket League', 'Rocket League combina el fútbol de estilo arcade con el caos a cuatro ruedas, unos controles fáciles y una competición fluida y basada en la física.', 'Multiplayer', 30, 'assets/img/Multijugador/RocketLegueVertical.jpg', 'assets/img/Multijugador/RocketLegueHorizontal.jpg', 5),
('Valorant', 'Shooter táctico 5v5 basado en personajes que está ambientado en un escenario internacional', 'Shooter', 40, 'assets/img/Shooter/ValorantVertical.avif', 'assets/img/Shooter/ValorantHorizontal.jpg', 4),
('Plantas vs Zombies Deluxe', 'Esta vez, lleva la batalla hasta los zombis. Pasa a la ofensiva con las plantas para reclamar Suburbia o detén la invasión botánica y defiende Zomburbia en nuevos modos de juego.', 'Shooter', 30, 'assets/img/Shooter/plantasvsZombiesVertical.avif', 'assets/img/Shooter/PlantasVsZombiesHorizontal.jpg', 5),
('FarCry 6', 'Experimenta la adrenalina de una revolución guerrillera moderna.', 'Shooter', 48, 'assets/img/Shooter/FarCryVertical.jpg', 'assets/img/Shooter/FarCryHorizontal.png', 5),
('Battlefield', 'Marca el regreso a la emblemática guerra total de la franquicia.', 'Shooter', 60, 'assets/img/Shooter/BattlefielVertical.jpg', 'assets/img/Shooter/BattlefieldHorizontal.jpg', 5),
('Star Wars', 'Disfruta del primer juego de mundo abierto de Star Wars™ y explora distintos lugares por toda la galaxia.', 'Shooter', 104, 'assets/img/Shooter/StarWarsVertical.jpg', 'assets/img/Shooter/StarWarsHorizontal.jpg', 5),
('Pay Day', 'Al de tu retiro y vuelve a la vida criminal con la banda PAYDAY, la envidia de otros delincuentes y la pesadilla de las fuerzas del orden allá donde van.', 'Shooter', 30, 'assets/img/Shooter/PayDayVertical.avif', 'assets/img/Shooter/PayDayHorizontal.jpg', 5),
('Fornite', 'Consigue ser el último jugador en pie en Battle Royale y Cero construcción.', 'Battle Royale', 20, 'assets/img/BattleRoyal/ForniteVertical.jpg', 'assets/img/BattleRoyal/ForniteHorizontal.jpg', 5),
('Mini Royal', 'En Mini Royale, hasta 50 soldaditos de juguete luchan por la victoria.', 'Battle Royale', 10, 'assets/img/BattleRoyal/MiniRoyalVertical.avif', 'assets/img/BattleRoyal/MiniRoyalHorizontal.jpg', 5),
('Open Season', 'Juego de disparos en tercera persona que enfrenta a varias comunidades NFT entre sí en una batalla real multijugador.', 'Battle Royale', 40, 'assets/img/BattleRoyal/OpenSeasonVertical.avif', 'assets/img/BattleRoyal/OpenSeasonHorizontal.png', 5),
('Realm Royal', 'Escoge tu clase, forja armas letales y domina poderosas habilidades para ser el último campeón que quede en pie.', 'Battle Royale', 30, 'assets/img/BattleRoyal/RealmRoyalVertical.jpg', 'assets/img/BattleRoyal/RealRoyalHorizontal.jpg', 5),
('Fall Guys', 'Es un party royale gratis y multiplataforma. Compite a lo torpe en absurdos circuitos de obstáculos con amigos o construye tu propio circuito caótico para compartirlo con la comunidad.', 'Multiplayer', 20, 'assets/img/Multijugador/FallGuysVertical.jpg', 'assets/img/Multijugador/FallGuysHorizontal.jpg', 5),
('Overcooked', 'Cocina solo o con amigos por todo el Reino de la Cebolla (Onion Kingdom) y domina más de 20 recetas en 130 deliciosos niveles.', 'Multiplayer', 15, 'assets/img/Multijugador/OverCoockedVertical.jpg', 'assets/img/Multijugador/OverCookedHorizontal.jpg', 5),
('Among Us', 'Debéis preparar vuestra nave espacial para el despegue. Pero, cuidado: ¡uno o más jugadores elegidos al azar entre la tripulación son impostores dispuestos a matar al resto!', 'Multiplayer', 10, 'assets/img/Multijugador/AmongUsVertical.jpg', 'assets/img/Multijugador/AmongUsHorizontal.jpg', 5),
('Lego Star Wars', 'Juega a través de las nueve películas de la saga Skywalker en un videojuego distinto de cualquier otro.', 'Multiplayer', 50, 'assets/img/Multijugador/LegoStarWarsvertical.jpg', 'assets/img/Multijugador/LegoStarWarsHorizontal.jpg', 5),
('F1® 24', 'Únete a la parrilla y sé 1 de las 20 personas al volante. Maneja como las grandes estrellas de la F1.', 'Deportes', 90, 'assets/img/Deportes/F1Vertical.avif', 'assets/img/Deportes/F1Horizontal.jpg', 5),
('EA SPORTS FC™ 24', 'Lidera a tu país hacia la gloria europea en EA SPORTS FC™ 24 y vive la auténtica emoción del torneo de la UEFA EURO.', 'Deportes', 70, 'assets/img/Deportes/FC24Vertical.jpg', 'assets/img/Deportes/FC24Horizontal.jpg', 5),
('Tenis Manager', 'Vive una simulación de tenis de máximo realismo, donde tus decisiones determinarán el destino de tu academia.', 'Deportes', 9, 'assets/img/Deportes/TenisVertical.jpg', 'assets/img/Deportes/TenisHorizontal.jpg', 5),
('Tour de France', 'Lucha por el maillot amarillo en el juego oficial del Tour de France 2022.', 'Deportes', 30, 'assets/img/Deportes/TourDeFranceVertical.jpg', 'assets/img/Deportes/TourFranceHorizontal.jpg', 5);
