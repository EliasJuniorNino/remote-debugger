var socket = io();

class Greeting extends React.Component {

    constructor() {
        super()

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        socket.on('request', this.addMessage.bind(this))
    }

    addMessage(data) {
        console.log(data)

        this.setState({
            messages: [...(this.state.messages || []), data]
        })
    }
    
    render() {
        return (
            <ul>
                {this.state.messages.map((item, index) => (
                    <li key={index}>
                        <div className="date">{item.date}</div>
                        <div className="path">{item.path}</div>
                        <code className="body">{JSON.stringify(item.body)}</code>
                    </li>
                ))}
            </ul>
        );
    };
}

ReactDOM.render(
    <Greeting />,
    document.getElementById('root')
);