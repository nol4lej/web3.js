export function Main(){
    return `
        <section class="container blockchain">
            <div class="blockchain__connect">
                <span class="blockchain__current" id="current_blockchain">● Connecting Chain</span>
            </div>
            <div class="blockchain__data">
                <div class="input__data">
                    <h4>Lastest Block:</h4>
                    <span id="current_block"></span>
                </div>
                <div class="input__data">
                    <h4>Miner:</h4>  
                    <span id="block_miner"></span>
                    <button id="copy_miner" class="material-icons">content_copy</button>
                    <span id="copied_miner">Copied!</span>
                </div>
                <div class="input__data">
                    <h4>Hash:</h4>
                    <span id="hash_block"></span>
                    <button id="copy_hash" class="material-icons">content_copy</button>
                    <span id="copied_hash">Copied!</span>
                </div>
                <div class="input__data">
                    <h4>Gas used:</h4>
                    <span id="gas"></span>
                </div>
            </div>
            

        </section>
    `
}