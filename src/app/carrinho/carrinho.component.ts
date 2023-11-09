import { CarrinhoService } from './../carrinho.service';
import { Component, OnInit } from '@angular/core';
import { IProdutoCarrinho } from '../produtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;
//mudou para minuscula carrinhoService
  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
  )
  { }
  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calculaTotal();
  }
  calculaTotal() {
    this.total = this.itensCarrinho.reduce(
      (prev, curr) => prev + curr.preco * curr.quantidade, 0);
  }
  removerProdutoCarrinho(produtoId: number) {
    this.itensCarrinho = this.itensCarrinho.filter((item) => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calculaTotal();
  }
  comprar() {
    alert("Parabéms, você finalizou a sua compra!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }
}
