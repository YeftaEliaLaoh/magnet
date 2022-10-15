import React from 'react';

class SelectTgl extends React.Component {
    buildOptions() {
        var arr = [];
        arr.push(<option key="" value="">Tanggal</option>)
        for (let i = 1; i <= 31; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }
        return arr;
    }

    render() {
        return (

            this.buildOptions()

        );
    }
}

class SelectBln extends React.Component {
    buildOptions() {
        var arr = [];
        var bln = ['Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        for (let i = 0; i <= 12; i++) {
            let val = i < 10 && i > 0 ? '0' + i : i;
            val = val === 0 ? "" : val;
            arr.push(<option key={i} value={val}>{bln[i]}</option>)
        }

        return arr;
    }

    render() {
        return (
            this.buildOptions()

        );
    }
}

class SelectThn extends React.Component {
    buildOptions() {
        var arr = [];
        arr.push(<option key="" value="">Tahun</option>)
        for (let i = 2000; i >= 1970; i--) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }

        return arr;
    }

    render() {
        return (
            this.buildOptions()

        );
    }
}

export { SelectTgl, SelectBln, SelectThn };