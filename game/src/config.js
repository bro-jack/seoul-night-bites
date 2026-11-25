// Seoul Night Bites — tuning numbers and colours in one place.
// A Korean pojangmacha (street-food tent) in a Seoul night market: neon
// Hangul signs, paper lanterns, steam, a N Seoul Tower skyline. Playfield
// is a fixed 1280x720 logical area for the HUD; the 3D scene is rendered
// behind it.
export const FIELD = { width: 1280, height: 720 };

/** Fixed simulation step: 60 updates a second whatever the display rate. */
export const STEP = 1 / 60;

/** One full shift, in seconds. */
export const SHIFT_SECONDS = 180;

export const HEARTS = 3;
export const BURN_SECONDS = 4;
export const VIP_CHANCE = 0.25;

/** Seoul Rush systems (v4, carried from v3): a Seoul Rush wave every 45 s
 *  for 15 s (2x spawn), one boss VIP per shift (CEO Kim), ingredients going
 *  stale in the hand after 12 s, a combo multiplier up to x5, and tips for
 *  perfect serves. */
export const FIESTA_EVERY = 45;
export const FIESTA_SECONDS = 15;
export const BOSS_AT = 90;
export const BOSS_PAY = 3;
export const FRESH_SECONDS = 12;
export const COMBO_CAP = 5;
export const TIP_RATE = 0.1;

/** Perfect Cook timing bar (revisi v3, 13:50 WIB): while a station job cooks,
 *  a needle sweeps 0..1; hit the station again in the green zone = instant
 *  finish, yellow = +50% progress, outside = -25%. */
export const TIMING_SPEED = 1.6; // needle sweeps per second (0..1..0)
export const TIMING_GREEN = [0.44, 0.56];
export const TIMING_YELLOW = [0.28, 0.72];
/** Slow Time power-up: every 5 perfect serves grants 1 charge (max 2);
 *  press X to halve patience drain for 10 s. */
export const SLOW_SECONDS = 10;
export const SLOW_PERFECTS = 5;
export const SLOW_MAX = 2;
/** Last Second Save: serving an order under 20% patience pays +₩3.000. */
export const LAST_SECOND_FRAC = 0.2;
export const LAST_SECOND_BONUS = 3000;

/** Three levels inside one 180 s shift. Pressure grows for real: patience
 *  shrinks, orders spawn faster, more tickets fit the board, new dishes
 *  unlock, VIPs arrive in Seoul Rush — and in Seoul Rush a panci/grill job
 *  left more than BURN_SECONDS after it finishes burns and must be trashed. */
export const LEVEL_AT = [0, 60, 120];
export const LEVELS = [
  {
    name: 'BUKA POJANGMACHA', patience: 45, spawn: 11, maxOrders: 2,
    dishes: ['tteokbokki', 'ramyeon', 'kimbap', 'yangnyeom'], unlock: [],
  },
  {
    name: 'JAM MAKAN MALAM', patience: 35, spawn: 8, maxOrders: 3,
    dishes: ['tteokbokki', 'ramyeon', 'kimbap', 'yangnyeom', 'bibimbap', 'kimchi-jjigae', 'japchae', 'hotteok'],
    unlock: ['bibimbap', 'kimchi-jjigae', 'japchae', 'hotteok'],
  },
  {
    name: 'SEOUL RUSH', patience: 25, spawn: 6, maxOrders: 4,
    dishes: ['tteokbokki', 'ramyeon', 'kimbap', 'yangnyeom', 'bibimbap', 'kimchi-jjigae', 'japchae', 'hotteok', 'bulgogi-dish', 'mandu', 'bingsu', 'sikhye', 'cheese-dak', 'odeng-skewer', 'kimchi-rice', 'tteok-kkochi'],
    unlock: ['bulgogi-dish', 'mandu', 'bingsu', 'sikhye', 'cheese-dak', 'odeng-skewer', 'kimchi-rice', 'tteok-kkochi'],
  },
];

// --- Ingredients -------------------------------------------------------------
// 17 bins on the counter (keys 1-9, 0, Q, E, R, A, S, D, F).
export const CHOP_SECONDS = 1.6;
export const COOK_SECONDS = 3.0;
export const GRILL_SECONDS = 3.2;

export const INGREDIENTS = [
  { id: 'nasi', label: 'Nasi', color: '#f5efe0', shape: 'bowl' },
  { id: 'mie', label: 'Mie', color: '#f2c94c', shape: 'noodle' },
  { id: 'daging', label: 'Daging', color: '#c94a3d', shape: 'meat' },
  { id: 'ayam', label: 'Ayam', color: '#e88a7a', shape: 'drum' },
  { id: 'kimchi', label: 'Kimchi', color: '#d6332a', shape: 'pile' },
  { id: 'telur', label: 'Telur', color: '#fdf3d0', shape: 'egg' },
  { id: 'keju', label: 'Keju', color: '#f2c94c', shape: 'block' },
  { id: 'tteok', label: 'Tteok', color: '#f5efe0', shape: 'tube' },
  { id: 'odeng', label: 'Odeng', color: '#e8c88a', shape: 'sheet' },
  { id: 'sayur', label: 'Sayur', color: '#5a8a3d', shape: 'leaf' },
  { id: 'gochujang', label: 'Gochujang', color: '#c0392b', shape: 'paste' },
  { id: 'nori', label: 'Nori', color: '#1d3a24', shape: 'flat' },
  { id: 'udang', label: 'Udang', color: '#f2a594', shape: 'shrimp' },
  { id: 'gula', label: 'Gula', color: '#ffffff', shape: 'powder' },
  { id: 'es', label: 'Es', color: '#aee6f5', shape: 'cube' },
  { id: 'madu', label: 'Madu', color: '#f2b705', shape: 'jar' },
  { id: 'soda', label: 'Soda', color: '#7ac9d9', shape: 'bottle' },
];

/** Keyboard label per bin: 1-9, then 0, Q, E, R, A, S, D, F. */
export const KEY_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'E', 'R', 'A', 'S', 'D', 'F'];

export const ING_BY_ID = Object.fromEntries(INGREDIENTS.map((i) => [i.id, i]));

// Chopping: raw -> sliced. Cooking (panci): raw -> cooked. Grilling
// (grill): chicken/beef slices -> fried / bulgogi.
export const CHOP = { daging: 'daging-iris', ayam: 'ayam-potong', sayur: 'sayur-iris', odeng: 'odeng-iris' };
export const COOK = { mie: 'mie-rebus', tteok: 'tteok-masak', telur: 'ajitama', udang: 'tempura-ebi' };
export const GRILL = { 'ayam-potong': 'ayam-goreng', 'daging-iris': 'bulgogi' };

export const ITEM_LABEL = {
  nasi: 'Nasi', mie: 'Mie', daging: 'Daging', ayam: 'Ayam',
  kimchi: 'Kimchi', telur: 'Telur', keju: 'Keju', tteok: 'Tteok',
  odeng: 'Odeng', sayur: 'Sayur', gochujang: 'Gochujang', nori: 'Nori',
  udang: 'Udang', gula: 'Gula', es: 'Es Batu', madu: 'Madu', soda: 'Soda',
  'daging-iris': 'Daging Iris', 'ayam-potong': 'Ayam Potong',
  'sayur-iris': 'Sayur Iris', 'odeng-iris': 'Odeng Iris',
  'mie-rebus': 'Mie Rebus', 'tteok-masak': 'Tteok Masak',
  ajitama: 'Telur Rebus', 'tempura-ebi': 'Udang Tempura',
  'ayam-goreng': 'Ayam Goreng', bulgogi: 'Bulgogi',
  gosong: 'Gosong!',
};

export const ITEM_COLOR = {
  nasi: '#f5efe0', mie: '#f2c94c', daging: '#c94a3d', ayam: '#e88a7a',
  kimchi: '#d6332a', telur: '#fdf3d0', keju: '#f2c94c', tteok: '#f5efe0',
  odeng: '#e8c88a', sayur: '#5a8a3d', gochujang: '#c0392b', nori: '#1d3a24',
  udang: '#f2a594', gula: '#ffffff', es: '#aee6f5', madu: '#f2b705',
  soda: '#7ac9d9',
  'daging-iris': '#c94a3d', 'ayam-potong': '#e88a7a',
  'sayur-iris': '#5a8a3d', 'odeng-iris': '#e8c88a',
  'mie-rebus': '#f2c94c', 'tteok-masak': '#d6332a',
  ajitama: '#fdf3d0', 'tempura-ebi': '#e8a83c',
  'ayam-goreng': '#c98a3d', bulgogi: '#6a3a1e', gosong: '#1a1a1a',
};

// --- Dishes (plate recipes) ---------------------------------------------------
// 16 dishes, prices in won (shown as ₩): 4 from level 1, 4 unlock at
// level 2, 8 at level 3. All Korean street food.
export const DISHES = [
  { id: 'tteokbokki', name: 'Tteokbokki', needs: ['tteok-masak', 'gochujang', 'odeng-iris'], price: 9000, color: '#d6332a', icon: 'skewer' },
  { id: 'ramyeon', name: 'Ramyeon', needs: ['mie-rebus', 'ajitama', 'kimchi'], price: 7000, color: '#f2c94c', icon: 'bowl' },
  { id: 'kimbap', name: 'Kimbap', needs: ['nasi', 'nori', 'ajitama'], price: 8000, color: '#1d3a24', icon: 'roll' },
  { id: 'yangnyeom', name: 'Yangnyeom Chicken', needs: ['ayam-goreng', 'gochujang'], price: 11000, color: '#c0392b', icon: 'drum' },
  { id: 'bibimbap', name: 'Bibimbap', needs: ['nasi', 'daging-iris', 'sayur-iris', 'ajitama'], price: 12000, color: '#c94a3d', icon: 'bowl' },
  { id: 'kimchi-jjigae', name: 'Kimchi Jjigae', needs: ['kimchi', 'daging-iris', 'sayur-iris'], price: 10000, color: '#d6332a', icon: 'broth' },
  { id: 'japchae', name: 'Japchae', needs: ['mie-rebus', 'sayur-iris', 'daging-iris'], price: 11000, color: '#8a5a2e', icon: 'noodle' },
  { id: 'hotteok', name: 'Hotteok', needs: ['gula', 'madu'], price: 5000, color: '#f2b705', icon: 'pancake' },
  { id: 'bulgogi-dish', name: 'Bulgogi', needs: ['bulgogi', 'sayur-iris', 'nasi'], price: 13000, color: '#6a3a1e', icon: 'skillet' },
  { id: 'mandu', name: 'Mandu', needs: ['daging-iris', 'sayur-iris'], price: 8000, color: '#f5efe0', icon: 'dumpling' },
  { id: 'bingsu', name: 'Bingsu', needs: ['es', 'gula', 'madu'], price: 9000, color: '#aee6f5', icon: 'cup' },
  { id: 'sikhye', name: 'Sikhye', needs: ['nasi', 'gula', 'es'], price: 5000, color: '#f5efe0', icon: 'cup' },
  { id: 'cheese-dak', name: 'Cheese Dakgangjeong', needs: ['ayam-goreng', 'keju'], price: 12000, color: '#f2c94c', icon: 'drum' },
  { id: 'odeng-skewer', name: 'Odeng Kkochi', needs: ['odeng-iris', 'gochujang'], price: 6000, color: '#e8c88a', icon: 'skewer' },
  { id: 'kimchi-rice', name: 'Kimchi Fried Rice', needs: ['nasi', 'kimchi', 'ajitama'], price: 10000, color: '#d6332a', icon: 'bowl' },
  { id: 'tteok-kkochi', name: 'Tteok-kkochi', needs: ['tteok-masak', 'gochujang', 'keju'], price: 7000, color: '#d6332a', icon: 'skewer' },
];

/** The boss VIP's mega dish: 4 ingredients, served once per shift. Not in the
 *  normal spawn pool — only CEO Kim orders it. */
export const BOSS_DISH = {
  id: 'seoul-grand', name: 'Seoul Grand Feast',
  needs: ['bulgogi', 'ayam-goreng', 'tteok-masak', 'kimchi'], price: 30000, color: '#f2c94c', icon: 'feast',
};

export const DISH_BY_ID = Object.fromEntries(DISHES.map((d) => [d.id, d]));

export const PALETTE = {
  backdrop: '#0d0a1a',
  wall: '#14142e',
  counter: '#1e1430',
  counterTop: '#33244a',
  board: '#12081f',
  boardPaper: '#fff8e6',
  panel: '#fff8e6',
  ink: '#1a0d08',
  muted: '#a89880',
  accent: '#ff2e88',
  gold: '#f2c94c',
  green: '#4e9b47',
  red: '#ff3b5c',
  timer: '#ff3b5c',
  hand: '#ffe9a8',
  neonPink: '#ff2e88',
  neonCyan: '#22d3ee',
  neonGold: '#f2c94c',
};

export const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';

/** Best score between visits (this browser only). */
export const BEST_KEY = 'seoul-night-bites.best';
