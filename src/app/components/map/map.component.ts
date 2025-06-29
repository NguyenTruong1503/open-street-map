import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map!: L.Map;

  ngOnInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Tạo map với OpenStreetMap tiles
    this.map = L.map(this.mapContainer.nativeElement).setView([10.8482, 106.7714], 16);  // Sư phạm kỹ thuật

    // Thêm OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);


    // Thêm marker cho Sư phạm kỹ thuật
    const marker = L.marker([10.8508, 106.7767]).addTo(this.map);
    marker.bindPopup('Sư phạm kỹ thuật').openPopup();

    // Thêm đường nối điểm

    const latlngs: L.LatLngExpression[] = [
      [21.0285, 105.8542],
      [21.03, 105.85],
      [21.035, 105.86]
    ];
    const polyline = L.polyline(latlngs, { color: 'blue', weight: 4, opacity: 0.5 }).addTo(this.map);
    polyline.bindPopup('Đây là một tuyến đường');

    const polygon = L.polygon([
      [21.03, 105.85],
      [21.035, 105.86],
      [21.04, 105.855]
    ], { color: 'blue' }).addTo(this.map);
    polygon.bindPopup('Khu vực đặc biệt');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        L.marker([lat, lng]).addTo(this.map).bindPopup('Vị trí của bạn');
        this.map.setView([lat, lng], 15);
      });
    }
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    const satellite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
    const baseMaps = {
      "Streets": streets,
      "Satellite": satellite
    };
    L.control.layers(baseMaps).addTo(this.map);

    this.map.on('click', (e: any) => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent(`Tọa độ: ${e.latlng.lat}, ${e.latlng.lng}`)
        .openOn(this.map);
    });

  }
}