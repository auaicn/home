import type { ChecklistCategoryDef } from "@/lib/types/checklist"

export const CHECKLIST_CATEGORIES: ChecklistCategoryDef[] = [
  {
    id: "appliance",
    label: "가전제품",
    midCategories: [
      {
        id: "appliance-kitchen",
        label: "주방가전",
        subCategories: [
          { id: "appliance-kitchen-refrigerator", label: "냉장고", applianceKey: "refrigerator", items: [] },
          { id: "appliance-kitchen-kimchi-refrigerator", label: "김치냉장고", applianceKey: "kimchi_refrigerator", items: [] },
          { id: "appliance-kitchen-microwave", label: "전자레인지", items: [] },
          { id: "appliance-kitchen-ricecooker", label: "밥솥", items: [] },
          { id: "appliance-kitchen-kettle", label: "전기포트", items: [] },
          {
            id: "appliance-kitchen-airfryer",
            label: "에어프라이어",
            items: [
              {
                id: "airfryer-cuisinart-toa60",
                label: "Cuisinart TOA-60KR 에어프라이어 오븐 17L",
                priceKrw: 169000,
                url: "https://prod.danawa.com/info/?pcode=6250973",
              },
              {
                id: "airfryer-cuisinart-toa70",
                label: "Cuisinart TOA-70KR 에어프라이어 그릴 오븐",
                priceKrw: 319000,
                url: "https://www.ssg.com/item/itemView.ssg?itemId=1000498062855",
              },
              {
                id: "airfryer-cuisinart-toa75",
                label: "Cuisinart TOA-75KR 디지털 에어프라이어 오븐",
                priceKrw: 329000,
                url: "https://metashop.co.kr/product/%EC%BF%A0%EC%A7%84%EC%95%84%ED%8A%B8-%EB%94%94%EC%A7%80%ED%84%B8-%EC%97%90%EC%96%B4%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4-%EC%98%A4%EB%B8%90-toa-75kr/6143/",
              },
            ],
          },
          {
            id: "appliance-kitchen-toaster",
            label: "토스터",
            items: [
              {
                id: "toaster-balmuda-k05b-wh",
                label: "BALMUDA The Toaster K05B (화이트)",
                priceKrw: 243000,
                url: "https://prod.danawa.com/info/?pcode=13221764",
              },
              {
                id: "toaster-balmuda-k05b-bk",
                label: "BALMUDA The Toaster K05B (블랙)",
                priceKrw: 243000,
                url: "https://prod.danawa.com/info/?pcode=13221920",
              },
            ],
          },
        ],
      },
      {
        id: "appliance-living",
        label: "생활가전",
        subCategories: [
          { id: "appliance-living-washer", label: "세탁기", applianceKey: "washer", items: [] },
          { id: "appliance-living-dryer", label: "건조기", applianceKey: "dryer", items: [] },
          { id: "appliance-living-robot-vacuum", label: "로봇청소기", applianceKey: "vacuum", applianceSection: "robot", items: [] },
          { id: "appliance-living-cordless-vacuum", label: "무선청소기", applianceKey: "vacuum", applianceSection: "cordless", items: [] },
          { id: "appliance-living-air-purifier", label: "공기청정기", items: [] },
          { id: "appliance-living-dehumidifier", label: "제습기", items: [] },
          { id: "appliance-living-water-purifier", label: "정수기", applianceKey: "water_purifier", applianceSection: "hot_cold", items: [] },
          { id: "appliance-living-ice-purifier", label: "얼음정수기", applianceKey: "water_purifier", applianceSection: "ice", items: [] },
        ],
      },
      {
        id: "appliance-seasonal",
        label: "계절가전",
        subCategories: [
          { id: "appliance-seasonal-ac", label: "에어컨", items: [] },
          { id: "appliance-seasonal-fan", label: "선풍기", items: [] },
          { id: "appliance-seasonal-heatpad", label: "전기장판", items: [] },
          { id: "appliance-seasonal-heater", label: "히터", items: [] },
        ],
      },
      {
        id: "appliance-entertainment",
        label: "엔터테인먼트",
        subCategories: [
          { id: "appliance-entertainment-tv", label: "TV", applianceKey: "tv", items: [] },
          { id: "appliance-entertainment-moving-tv", label: "이동형 TV", applianceKey: "moving_tv", items: [] },
          { id: "appliance-entertainment-speaker", label: "스피커", items: [] },
          { id: "appliance-entertainment-router", label: "공유기", items: [] },
        ],
      },
    ],
  },
  {
    id: "furniture",
    label: "가구",
    midCategories: [
      {
        id: "furniture-living",
        label: "거실",
        subCategories: [
          { id: "furniture-living-sofa", label: "소파", items: [] },
          { id: "furniture-living-table", label: "테이블", items: [] },
          { id: "furniture-living-tv-cabinet", label: "TV장", items: [] },
          { id: "furniture-living-rug", label: "러그", items: [] },
        ],
      },
      {
        id: "furniture-bedroom",
        label: "침실",
        subCategories: [
          { id: "furniture-bedroom-bed", label: "침대", items: [] },
          { id: "furniture-bedroom-mattress", label: "매트리스", items: [] },
          { id: "furniture-bedroom-nightstand", label: "협탁", items: [] },
          { id: "furniture-bedroom-dresser", label: "화장대", items: [] },
          { id: "furniture-bedroom-wardrobe", label: "옷장", items: [] },
        ],
      },
      {
        id: "furniture-kitchen",
        label: "주방/식당",
        subCategories: [
          { id: "furniture-kitchen-dining-table", label: "식탁", items: [] },
          { id: "furniture-kitchen-chair", label: "의자", items: [] },
          { id: "furniture-kitchen-storage", label: "수납장", items: [] },
        ],
      },
      {
        id: "furniture-etc",
        label: "기타",
        subCategories: [
          { id: "furniture-etc-desk", label: "책상", items: [] },
          { id: "furniture-etc-chair", label: "의자", items: [] },
          { id: "furniture-etc-shelf", label: "선반", items: [] },
          { id: "furniture-etc-box", label: "수납함", items: [] },
        ],
      },
    ],
  },
  {
    id: "kitchen",
    label: "주방용품",
    midCategories: [
      {
        id: "kitchen-cooking",
        label: "조리도구",
        subCategories: [
          { id: "kitchen-cooking-pot", label: "냄비", items: [] },
          { id: "kitchen-cooking-pan", label: "프라이팬", items: [] },
          {
            id: "kitchen-cooking-knife-1",
            label: "칼 (산토쿠)",
            items: [
              {
                id: "knife-global-g80",
                label: "Global G-80 산토쿠 180mm",
                priceKrw: 124100,
                url: "https://prod.danawa.com/info/?pcode=1027238",
              },
            ],
          },
          {
            id: "kitchen-cooking-knife-2",
            label: "칼 (프리미엄)",
            items: [
              {
                id: "knife-global-sai03",
                label: "Global SAI-03 산토쿠 190mm",
                priceKrw: 212890,
                url: "https://prod.danawa.com/info/?pcode=17380064",
              },
            ],
          },
          { id: "kitchen-cooking-board", label: "도마", items: [] },
          { id: "kitchen-cooking-spatula", label: "뒤집개", items: [] },
        ],
      },
      {
        id: "kitchen-tableware",
        label: "식기류",
        subCategories: [
          { id: "kitchen-tableware-plate", label: "접시", items: [] },
          { id: "kitchen-tableware-bowl", label: "그릇", items: [] },
          { id: "kitchen-tableware-cup", label: "컵", items: [] },
          { id: "kitchen-tableware-cutlery", label: "수저세트", items: [] },
        ],
      },
      {
        id: "kitchen-storage",
        label: "보관용품",
        subCategories: [
          { id: "kitchen-storage-container", label: "밀폐용기", items: [] },
          { id: "kitchen-storage-wrap", label: "랩", items: [] },
          { id: "kitchen-storage-foil", label: "호일", items: [] },
        ],
      },
      {
        id: "kitchen-cleaning",
        label: "청소용품",
        subCategories: [
          { id: "kitchen-cleaning-sponge", label: "수세미", items: [] },
          { id: "kitchen-cleaning-detergent", label: "세제", items: [] },
          { id: "kitchen-cleaning-cloth", label: "행주", items: [] },
          { id: "kitchen-cleaning-dryrack", label: "건조대", items: [] },
        ],
      },
    ],
  },
  {
    id: "bedding",
    label: "침구·패브릭",
    midCategories: [
      {
        id: "bedding-main",
        label: "침구·패브릭",
        subCategories: [
          { id: "bedding-set", label: "침구세트", items: [] },
          { id: "bedding-pillow", label: "베개", items: [] },
          { id: "bedding-duvet", label: "이불", items: [] },
          { id: "bedding-curtain", label: "커튼", items: [] },
          { id: "bedding-cushion", label: "쿠션", items: [] },
          { id: "bedding-blanket", label: "담요", items: [] },
        ],
      },
    ],
  },
  {
    id: "bathroom",
    label: "욕실용품",
    midCategories: [
      {
        id: "bathroom-main",
        label: "욕실용품",
        subCategories: [
          { id: "bathroom-towel", label: "수건", items: [] },
          { id: "bathroom-mat", label: "욕실매트", items: [] },
          { id: "bathroom-curtain", label: "샤워커튼", items: [] },
          { id: "bathroom-organizer", label: "세면도구 정리함", items: [] },
          { id: "bathroom-trashcan", label: "휴지통", items: [] },
          { id: "bathroom-toiletries", label: "세면용품", items: [] },
        ],
      },
    ],
  },
  {
    id: "cleaning",
    label: "청소·세탁",
    midCategories: [
      {
        id: "cleaning-main",
        label: "청소·세탁",
        subCategories: [
          { id: "cleaning-tools", label: "청소도구", items: [] },
          { id: "cleaning-detergent", label: "세탁세제", items: [] },
          { id: "cleaning-softener", label: "섬유유연제", items: [] },
          { id: "cleaning-dryrack", label: "빨래건조대", items: [] },
          { id: "cleaning-basket", label: "빨래바구니", items: [] },
        ],
      },
    ],
  },
  {
    id: "consumable",
    label: "생활소모품",
    midCategories: [
      {
        id: "consumable-main",
        label: "생활소모품",
        subCategories: [
          { id: "consumable-tissue", label: "휴지", items: [] },
          { id: "consumable-wetcloth", label: "물티슈", items: [] },
          { id: "consumable-plasticbag", label: "비닐봉투", items: [] },
          { id: "consumable-trashbag", label: "종량제봉투", items: [] },
          { id: "consumable-battery", label: "건전지", items: [] },
          { id: "consumable-powerstrip", label: "멀티탭", items: [] },
        ],
      },
    ],
  },
  {
    id: "safety",
    label: "안전·관리",
    midCategories: [
      {
        id: "safety-main",
        label: "안전·관리",
        subCategories: [
          { id: "safety-firstaid", label: "구급상자", items: [] },
          { id: "safety-extinguisher", label: "소화기", items: [] },
          { id: "safety-doorlock", label: "도어락 배터리", items: [] },
          { id: "safety-toolkit", label: "공구세트", items: [] },
          { id: "safety-flashlight", label: "손전등", items: [] },
        ],
      },
    ],
  },
  {
    id: "interior",
    label: "인테리어·소품",
    midCategories: [
      {
        id: "interior-main",
        label: "인테리어·소품",
        subCategories: [
          { id: "interior-frame", label: "액자", items: [] },
          { id: "interior-plant", label: "식물", items: [] },
          { id: "interior-diffuser", label: "향초/디퓨저", items: [] },
          { id: "interior-clock", label: "벽시계", items: [] },
          { id: "interior-decoration", label: "장식품", items: [] },
        ],
      },
    ],
  },
]
