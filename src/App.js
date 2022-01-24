import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import { saveAs } from 'file-saver';
import watermark from "watermarkjs/lib";


class App extends Component {
    state =  {
        selectedFile: null,
        imagePreviewUrl: null,
        selectedChain: null,
    };
    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
            let bc = this.state.selectedChain;
            watermark([reader.result])
                .image(watermark.text.lowerRight('Minted on: ' + bc + ', PostChain Protected 🛡', '28px serif', '#fff', 0.5))
                .then(function (img) {
                    img.height = 200;
                    document.getElementById("text").appendChild(img);
                });
        }
        reader.readAsDataURL(event.target.files[0])

    }

    chainSelectedHandler = event => {
        console.log(event)
        this.setState({
            selectedChain: event.target[event.target.selectedIndex].value
        })
    }

    submit = () => {
        let img = document.querySelector('img');
        let imagePath = img.getAttribute('src');
        saveAs(imagePath, 'my-nft.jpg');
    }
    render() {

        let $selectedChain = (<div className="previewText image-container">{this.state.selectedChain}</div>);

    return (
        <div className="App">
            <h1>Postchain © </h1>
            <h3> Protect your NFT artwork against forgery. </h3>
            <div className="App">
                <label>Mint on: </label>
                <select value={this.selectedChain} onChange={this.chainSelectedHandler}>
                    <option value=""></option>
                    <option value="BSV">Bitcoin</option>
                    <option value="ETC">Ethereum</option>
                </select>
                <h4> {$selectedChain} </h4>

                { this.state.selectedChain ?
                    <span>
                        <input type="file" name="avatar" className={"btn btn-grey"} onChange={this.fileChangedHandler}/>
                    <br />
                        <div id="text">
                         <pre> </pre>
                     </div>
                    <button type="button" onClick={this.submit} className={"btn btn-green"}> Download </button>
                    </span>
                    : null
                }

            </div>
        </div>
    )
    }
}

export default App;
