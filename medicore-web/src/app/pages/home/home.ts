import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Skeleton } from "../../components/skeleton/skeleton";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Skeleton, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home{


}
