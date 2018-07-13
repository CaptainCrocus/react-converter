import React from 'react';
import axios from 'axios';
import cx from 'classnames';
import { TopMenu } from '../../../components/TopMenu';

// import { observable, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { ExchangerStore } from '../../../stores/exchangerStore';

interface BookPaneProps {
    exchangerStore?: ExchangerStore;
}

const instance = axios.create({
    baseURL: `https://api.nytimes.com/svc/books/v3/lists/best-sellers`
});

@inject('exchangerStore') @observer
export class BookPane extends React.Component<BookPaneProps, React.ComponentState>{

    // constructor(args:any[]){
    //     super(args);
    // }

    async getBooks(){
        const { data: {results} } = await instance.get(`history.json?api-key=56a567bf29c040699835f4a4dee08bd7`);
        this.props.exchangerStore.setBooks(results);
    }

    componentDidMount(){
        this.getBooks();
    }

    getTopMenuConfig() {
        return {
            left: {
                label: 'Back',
                action: () => this.props.exchangerStore.setBookPaneVisibility(false)
            },
            center: {
                label: '',
                action: {}
            },
            right: {
                label: '',
                action: {}
            }
        };
    }

    render(){
        const { left, center, right } = this.getTopMenuConfig();
        return (
            <div className={ cx('book-pane', { 'book-pane_open': this.props.exchangerStore.state.isBookPaneOpened }) }>
                <TopMenu
                    left={ left }
                />

                <div className="book-pane__content">
                    { this.props.exchangerStore.state.results.map( (value:any) => {
                        return (
                            <div className="book-pane__content-item">
                                {value.isbns.length > 0 &&
                                    <div className="cover-image">
                                        <img src={`http://covers.openlibrary.org/b/isbn/${value.isbns[0].isbn10}-S.jpg`} />
                                    </div>
                                }
                                <div className="book-info">
                                    <div><strong>Title:</strong> {value.title}</div>
                                    <div><strong>Author: </strong>{value.author}</div>
                                    <div><em>{value.description}</em></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

