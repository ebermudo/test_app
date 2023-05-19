import { Component, OnInit } from '@angular/core';
import { CallDataServiceService } from '../services/call-data-service.service';
import { Observable, concatMap, delay, forkJoin, from, interval, map, mergeMap, of, tap, toArray } from 'rxjs';
import { RandomData } from '../interfaces/randomData.interface';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public randomData: RandomData[] = [];
  public randomsFiltereds: RandomData[] = [];
  private start = 1;
  constructor(private randomService: CallDataServiceService) {}

  ngOnInit(): void {
    this.generateItems();
  }

  private generateItems() {
    let count = this.randomData.length + 50;
    this.start = this.randomData.length + 1;
    this.randomService.getJson(count, this.start).subscribe((response) => {
      response.map((responseData: any) => {
        this.randomData.push(responseData);
      });
      this.randomsFiltereds = this.randomData;
    });
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  public filter(event: string) {
    this.randomsFiltereds = this.randomData.filter((random) => {
      return (random.id.toString().includes(event) || random.id.toString() == event)
      || (random.text.toLowerCase().includes(event.toLowerCase()));
    });
  }
}
