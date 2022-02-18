import React from "react";
import './index.css';
import axios from "axios";



export default function Home() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [keyword, setKeyword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [file, setFile] = React.useState("");
    let csvFile; let formData = new FormData();





    const handleSubmit = (event) => {
        console.log(`
      Email: ${email}
      Password: ${password}
      Keyword:${keyword}
      Message: ${message}
      File:${file}
    `);

        event.preventDefault()

        const payload =
        {
            searchString: `${keyword}`,
            postGroup: `${message}`,
            username: `${email}`,
            password: `${password}`,
        }

        axios({
            method: "POST",
            url: 'http://127.0.0.1:3010/greeting/hello',
            data: formData,

            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("Success, firm added")
                } else {
                    console.log("Error occurred")
                }
            }
            ).catch(e => {
                console.log(e)
            })
        if (false) {
            const url = 'http://127.0.0.1:3010/greeting/hello';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: JSON.stringify(payload),
                data: csvFile,
            }
            console.log(`Options : \n`, options);
            fetch(url, options)
                .then(response => { return response.json(); })
                .then(res => { return res; })

        }



    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Facebook Scraper</h1>

            <label>
                Email:
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required />
            </label>

            <label>
                Password:
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
            </label>

            <label>
                Keyword:
                <input
                    name="name"
                    type="text"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    required />
            </label>

            <label>
                Message:
                <textarea
                    name="textarea"
                    type="textarea"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required />
            </label>

            <label>
                CSV File:
                <input
                    name="file"
                    type="file"
                    // pattern="^.+\.(xlsx|xls|csv)$"
                    // value=""
                    onChange={e => {

                        console.log(e);
                        let item = e.target.files[0];

                        console.log("File Value from target", e.target.files[0]);

                        const dataFile = {
                            "file": item
                        }

                        formData.append("file", dataFile);

                        console.log("Form Data after converting", formData);
                        csvFile = formData;

                        setTimeout(() => {
                            console.log(`CSV File \n ${csvFile}`);
                            setFile(formData);

                        }, 2000);
                    }}
                    required />
            </label>
            <button>Submit</button>
        </form>
    );
}