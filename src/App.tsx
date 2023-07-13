import * as echarts from 'echarts';

import './App.css'
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";

type EchartsData = {

    shirt: number
    cardigan: number
    chiffon: number
    pants: number
    heels: number
    socks: number

}

function App() {
    const canvas = useRef<HTMLDivElement | null>(null)
    const [data, setData] = useState<EchartsData | null>(null)
    const [formData, setFormData] = useState<EchartsData>({
        cardigan: 0,
        chiffon: 0,
        heels: 0,
        pants: 0,
        shirt: 0,
        socks: 0
    })

    useEffect(() => {
        fetch('http://localhost:4001/api/chat_one_data', {})
            .then(r => r.json())
            .then((data: { body: EchartsData }) => {
                setData(data.body)
            })
            .catch(e => {
                console.error(e)
            })
    }, [])

    useEffect(() => {
        if (canvas.current) {
            if (data) {
                // Create the echarts instance
                const myChart = echarts.init(canvas.current);
                // Draw the chart
                myChart.setOption({
                    title: {
                        text: 'ECharts Getting Started Example'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"]
                    },
                    yAxis: {},
                    series: [
                        {
                            name: 'sales',
                            type: 'bar',
                            data: [
                                data.shirt,
                                data.cardigan,
                                data.chiffon,
                                data.pants,
                                data.heels,
                                data.socks,
                            ]
                        }
                    ]
                });
            }
        }
    }, [data])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData((prevState) => {
            console.log(prevState)
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const createEcharts = (event: FormEvent) => {
        event.preventDefault()
        console.log(formData)
    }

    return (
        <>
            <form action="" onSubmit={createEcharts}>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder={"shirt"}
                        name="shirt"
                        defaultValue={"shirt"}
                        value={formData.shirt}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder={"cardigan"}
                        name="cardigan"
                        defaultValue={"cardigan"}
                        value={formData.cardigan}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder={"chiffon"}
                        name="chiffon"
                        defaultValue={"chiffon"}
                        value={formData.chiffon}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder={"pants"}
                        name="pants"
                        defaultValue={"pants"}
                        value={formData.pants}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder={"heels"}
                        name="heels"
                        defaultValue={"heels"}
                        value={formData.heels}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder={"socks"}
                        name="socks"
                        defaultValue={"socks"}
                        value={formData.socks}
                        onChange={handleInputChange}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>

            <div ref={canvas} style={{width: '60vw', height: '60vh'}}></div>
        </>
    )


}

export default App
