const books = [
  {
    id: 1,
    username: "Cagnus Marlsen",
    pgn: "g3 d6 Bg2 g6 d3 Bg7 Nc3 Nf6 e4 O-O h3 e5 Be3 c6 Qd2 b5 Nf3 Re8 g4 b4 Ne2 a5 Ng3 d5 O-O dxe4 dxe4 Qxd2 Nxd2 Ba6 Rfd1 Nbd7 Nb3 a4 Nc5 Nxc5 Bxc5 Rab8 b3 a3 Bf1 Bc8 f3 Be6 c3 bxc3 Rac1 Nd7 Bd6 Rb7 Rxc3 Bf8 Bxf8 Kxf8 Rdc1 c5 Nf5 gxf5 gxf5 Bxf5 exf5 Ke7 Rc4 Kf6 Ra4 Rc7 Rxa3 Nb6 Ra6 Rb8 Bd3 Kg5 Kf2 Nd5 Rg1+ Kh5 Rg7 h6 Rh7 Nf4 Raxh6+ Kg5 Bf1 c4 Bxc4 Rxc4",
    puzzle: {
      solution: ["h3h4", "g5f5", "h7f7"],
    },
    description: "Find the best move for white 🧠🧠",
    tags: ["Mate in 2", "Endgame", "Short"],
  },
  {
    id: 2,
    username: "Nans Hiemann",
    pgn: "e4 e5 Nf3 Nc6 Bb5 d6 O-O a6 Ba4 b5 Bb3 Bg4 h3 Bh5 d3 Nd4 Be3 Bxf3 gxf3 c6 f4 Nf6 Nc3 h6 Bxd4 exd4 Ne2 c5 e5 dxe5 fxe5 Nh7 Re1 Be7 Nf4 O-O e6 f6 Ng6 Re8 Qg4 Qc7 Qf3 Ng5 Qg4 c4 dxc4 bxc4 h4 cxb3 hxg5 fxg5 Qf3 bxc2 Qf7+ Kh7 Rac1 d3 Qf5 d2",
    puzzle: {
      solution: ["g6f8", "h7g8", "f5h7", "g8f8", "h7h8"],
    },
    description:
      "this problem took me a long time to solve :(( white to move and win",
    tags: ["Sacrifice", "Middlegame", "Mate in 3", "Double check"],
  },
  {
    id: 3,
    username: "Fobby Bischer",
    pgn: "d4 b6 e4 Bb7 Bd3 c6 c4 e6 Nc3 d6 Nf3 Be7 O-O Nf6 Re1 O-O Qc2 g6 Bh6 Re8 h3 Nh5 d5 cxd5 cxd5 exd5 exd5 Bf6 Rxe8+ Qxe8 Re1 Qd7 Qe2 Bxc3 Qe8+ Qxe8",
    puzzle: {
      solution: ["e1e8"],
    },
    description: "very easy puzzle hehehe 😎😎😎😎😎😎",
    tags: ["Mate in 1", "Kingside attack"],
  },
  {
    id: 4,
    username: "Karry Gasparov",
    pgn: "e4 e6 d4 c5 Nf3 cxd4 Nxd4 Nf6 Nc3 Bb4 f3 Bxc3+ bxc3 O-O Nb5 Qb6 Ba3 Re8 Nd6",
    puzzle: {
      solution: ["b6e3", "f1e2", "e3c3"],
    },
    description: "This happened in one of my games. Black to play 🤔",
    tags: ["Advantage", "Opening"],
  },
];

module.exports = books;
