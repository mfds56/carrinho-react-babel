const produtosLista = [
    {
        id: 'abc123',
        nome: 'Pet da Fotudona',
        descricao: 'Tosa e banho',
        preco: '150',
        imagem: 'https://girabetim.com.br/wp-content/uploads/2019/02/gato-cachorro2.png'
    },
    {
        id: 'bbc123',
        nome: 'Pet da Fox',
        descricao: 'Corte das Unhas',
        preco: '50',
        imagem: 'https://www.petsa.com.br/source/files/c/11104/800-472-0-0.jpg'
    },
    {
        id: 'cbc123',
        nome: 'Pet da Fotuda',
        descricao: 'Limpeza dos Dentes',
        preco: '100',
        imagem: 'https://vetloscolorados.com/wp-content/uploads/2016/11/pets_big.png'
    }
];

function ProdutoComponent(props) {
    return (
        <div className="col-sm-4 mb-3">
            <div className="card loja__item">
                <img className="card-img-top" src={props.item.imagem}/>
                <div className="card-body">
                    <h5 className="card-title">{props.item.nome}</h5>
                    <small>R${props.item.preco}</small>
                    <p className="card-text">{props.item.descricao}</p>
                    <button className="btn btn-primary" onClick={props.onAddCarrinho.bind(null, props.item)}>Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

function ListaProdutosComponent(props) {
    return (
        <div className="row loja">
            {props.children}
        </div>
    )
}

function valorTotal(carrinhoItens) {
    return Object.keys(carrinhoItens).reduce(function (acc, produtoId) {
        return acc + (carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade)
    }, 0);
}

function CarrinhoComponent(props) {
    return (
        <div className="carrinho">
            <div className="carrinho__itens">
                {Object.keys(props.itens).map(function (produtoId, index) {
                    return (
                        <div className="card carrinho__item" key={`item-carrinho-${index}`}>
                            <div className="card-body">
                                <h5 className="card=title">{props.itens[produtoId].nome}</h5>
                                <p className="card-text">Preço unidade: R${props.itens[produtoId].preco} |
                                    Quantidade: {props.itens[produtoId].quantidade}</p>
                                <p className="card-text">Valor:
                                    R${props.itens[produtoId].preco * props.itens[produtoId].quantidade}</p>
                                <button onClick={props.onRemoveItemCarrinho.bind(null, produtoId)}
                                        className="btn btn-danger btn-sm">Remover
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="carrinho__total mt-2 p-3">
                <h6>Total: <strong>R${valorTotal(props.itens)}</strong></h6>
            </div>
        </div>
    )
}

function AppComponente() {
    const [carrinhoItens, addItemCarrinho] = React.useState({});

    function addCarrinho(produto) {
        if (!carrinhoItens[produto.id]) {
            addItemCarrinho({
                ...carrinhoItens,
                [produto.id]: {
                    ...produto,
                    quantidade: 1
                }
            })
        } else {
            addItemCarrinho({
                ...carrinhoItens,
                [produto.id]: {
                    ...produto,
                    quantidade: ++carrinhoItens[produto.id].quantidade
                }
            })
        }
    }

    function removeItemCarrinho(produtoId) {
        if (carrinhoItens[produtoId].quantidade <= 1) {
            delete carrinhoItens[produtoId];
            addItemCarrinho({...carrinhoItens});
        } else {
            addItemCarrinho({
                ...carrinhoItens,
                [produtoId]: {
                    ...carrinhoItens[produtoId],
                    quantidade: --carrinhoItens[produtoId].quantidade
                }
            })
        }
    }

    return (
        <React.Fragment>
            <div className="col-sm-8">
                <ListaProdutosComponent>
                    {produtosLista.map((produto, index) => (
                        <ProdutoComponent
                            item={produto}
                            onAddCarrinho={addCarrinho}
                            key={`produto-${index}`}
                        />
                    ))}
                </ListaProdutosComponent>
            </div>
            <div className="col-sm-4">
                <CarrinhoComponent itens={carrinhoItens} onRemoveItemCarrinho={removeItemCarrinho}/>
            </div>
        </React.Fragment>
    )
}

ReactDOM.render(
    React.createElement(AppComponente),
    document.getElementById('app')
)