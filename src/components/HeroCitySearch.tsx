import React, { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Search, Loader2 } from "lucide-react";
import { CityPreset, GeocodingResult } from "@/types/air-quality";
import { CITY_PRESETS } from "@/lib/constants";

interface HeroCitySearchProps {
  selectedCity: CityPreset;
  onSelectCity: (city: CityPreset) => void;
  onUseGeolocation: () => void;
  isLoading: boolean;
}

export const HeroCitySearch: React.FC<HeroCitySearchProps> = ({
  selectedCity,
  onSelectCity,
  onUseGeolocation,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced geocoding search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(searchQuery.trim())}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setSearchResults(data);
            setIsDropdownOpen(data.length > 0);
          }
        }
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to dismiss dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectResult = (result: GeocodingResult) => {
    const city: CityPreset = {
      name: result.name,
      state: result.state,
      lat: result.lat,
      lon: result.lon,
      isHighSmogZone: false,
    };
    onSelectCity(city);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  return (
    <section className="bg-gradient-to-b from-teal-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-3">
            Active Indo-Gangetic Smog Corridor Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Personalized Daily Routines for Peak Smog Resilience
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Real time atmospheric telemetry, thermal radiation inversion detection, and clinically calibrated protection for sensitive respiratory groups.
          </p>
        </div>

        {/* Live Search and Geolocation Input Bar */}
        <div className="max-w-xl mx-auto relative mb-6" ref={dropdownRef}>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-teal-600">
            <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" aria-hidden="true" />
            <input
              type="text"
              role="combobox"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any Indian city or district (e.g. Mathura, Gurugram, Agra)..."
              className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none px-2"
              aria-label="Search Indian city or district"
              aria-autocomplete="list"
              aria-expanded={isDropdownOpen}
              aria-controls="city-search-results"
            />
            {isSearching && (
              <Loader2 className="w-4 h-4 text-teal-600 animate-spin mr-2 shrink-0" aria-hidden="true" />
            )}
            <button
              type="button"
              onClick={onUseGeolocation}
              disabled={isLoading}
              title="Detect Current Location via GPS"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition disabled:opacity-50 shrink-0 min-h-[40px]"
              aria-label="Use Current GPS Coordinates"
            >
              <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Detect GPS</span>
            </button>
          </div>

          {/* Autocomplete Dropdown with proper ARIA semantics */}
          {isDropdownOpen && searchResults.length > 0 && (
            <div
              id="city-search-results"
              role="listbox"
              aria-label="Matching cities"
              className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800"
            >
              {searchResults.map((result) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  key={`${result.id}-${result.lat}-${result.lon}`}
                  onClick={() => handleSelectResult(result)}
                  className="w-full px-4 py-2.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{result.name}</span>
                      <span className="text-slate-500 ml-1.5">{result.state}, {result.country}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {result.lat.toFixed(2)}&deg;N, {result.lon.toFixed(2)}&deg;E
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Indian Metros and Smog Belt Presets */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mb-2">
            Priority Smog Corridor Stations:
          </div>
          <nav aria-label="Priority smog stations" className="flex flex-wrap items-center justify-center gap-2">
            {CITY_PRESETS.map((city) => {
              const isSelected = selectedCity.name === city.name;
              return (
                <button
                  type="button"
                  key={city.name}
                  onClick={() => onSelectCity(city)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition min-h-[36px] ${
                    isSelected
                      ? "bg-teal-700 text-white shadow-sm ring-2 ring-teal-500"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  }`}
                  aria-pressed={isSelected}
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-500" aria-hidden="true" />
                  <span>{city.name}</span>
                  {city.isHighSmogZone && (
                    <span
                      title="High Winter Smog Trap Corridor"
                      className="w-2 h-2 rounded-full bg-red-500 inline-block"
                      aria-label="High Smog Warning"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
};
