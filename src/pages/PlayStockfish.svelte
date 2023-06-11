<script>
    import Chessboard from "../components/Chessboard.svelte";

    let moveToPlay = null;

    async function getStockfishMove(FEN) {
        FEN = FEN.replaceAll(" ", "");
        const response = await fetch(`https://www.chessdb.cn/cdb.php?action=querybest&board=${FEN}`)
	}

    // TODO: integrate stockfish to Chessboard
</script>

<div>
    <Chessboard />
</div>