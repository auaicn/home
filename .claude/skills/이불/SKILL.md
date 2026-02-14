---
name: 이불
description: Manage bedding quotes including Crown Goose products. Use when adding, searching, or comparing bedding items (duvets, pillows, sheets, toppers) for newlyweds. Crown Goose references are mandatory.
argument-hint: [add|search|compare|list|crown-goose] [product-name]
---

# 혼수 침구 견적 관리 🛏️

신혼부부를 위한 이불, 베개, 침구 세트의 견적을 관리하고 비교합니다.

## 주요 명령어

### `/이불 list`
모든 침구 제품 목록 표시
```
현재 등록된 제품:
- 거위털이불 (4개 견적)
- 거위털베개 (1개 견적)
- 거위털매트리스패드 (1개 견적)
```

### `/이불 search [키워드]`
키워드로 견적 검색
```
/이불 search crown
→ Crown Goose 관련 견적 5개 검색됨
→ 가격 범위: $167.17 ~ $471.12
```

### `/이불 compare [제품명]`
같은 제품의 여러 견적을 가격 및 스펙으로 비교
```
/이불 compare 거위털이불
┌──────────────────────┬────────┬──────────┐
│ 제품명               │ 가격   │ 온기    │
├──────────────────────┼────────┼──────────┤
│ Grand Duke (Very Warm)│$471.12│ Very Warm│
│ Duke (Warm)          │$408.55│ Warm     │
│ Count (Medium)       │$337.03│ Medium   │
│ Duchess (Cool)       │$274.45│ Cool     │
└──────────────────────┴────────┴──────────┘
```

### `/이불 add [제품명]`
새로운 견적 추가 (대화형)
```
/이불 add 거위털이불

스텝 1: 업체 정보
- 업체명: Crown Goose
- 웹사이트: https://en.crowngoose.com/

스텝 2: 제품 정보
- 모델명: Grand Duke Goose Down Duvet (Very Warm)
- 가격: 471.12
- 통화: USD
- 제품 URL: https://en.crowngoose.com/products/...

스텝 3: 상세 스펙
- 온기 레벨: Very Warm
- 필링: Polish Goose Down
- 사이즈: Queen
- Fill Power: 800+

스텝 4: 레퍼런스 (필수)
- URL 1: https://en.crowngoose.com/
- URL 2: https://millenniummagazine.com/...

✅ 견적이 추가되었습니다! (ID: quote-xxx)
```

### `/이불 crown-goose`
Crown Goose 제품만 모두 표시
```
Crown Goose 제품 목록:

거위털이불 (4개)
- Grand Duke: $471.12 (Very Warm)
- Duke: $408.55 (Warm)
- Count: $337.03 (Medium)
- Duchess: $274.45 (Cool)

거위털베개 (1개)
- Triple Layer Pillow: $167.17

거위털매트리스패드 (1개)
- Baron Topper: $364.74

총 6개 Crown Goose 제품
```

### `/이불 view [quote-id]`
특정 견적의 상세 정보 표시
```
/이불 view quote-cg-001

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grand Duke Goose Down Duvet (Very Warm)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

업체: Crown Goose
가격: $471.12 USD (원래: $879.00, 40% 할인)
제품 URL: https://en.crowngoose.com/products/...

사양:
- 온기 레벨: Very Warm
- 필링: Polish Goose Down
- 사이즈: Queen
- Fill Power: 800+
- 소재: 100% Cotton Shell

참고사항:
프리미엄 호텔급 품질, 신혼부부 결혼선물 추천

레퍼런스:
✓ https://en.crowngoose.com/
✓ https://millenniummagazine.com/home-decor/crown-goose-...

추가일: 2026-02-14
```

## Crown Goose 특별 정보

Crown Goose는 프리미엄 거위털 침구 전문 제조사입니다:

**웹사이트:**
- 공식사이트: https://en.crowngoose.com/
- 미국 스토어: https://crowngooseusa.com/

**제품 라인:**
- **Duvets (이불)**: 4가지 온기 레벨 (Very Warm ~ Cool)
  - Grand Duke, Duke, Count, Duchess
- **Pillows (베개)**: Triple Layer, Hotel Collection
- **Toppers (토퍼)**: Baron series (매트리스 토퍼)

**특징:**
- 폴란드산 거위털 충전재 (Polish Goose Down)
- Fill Power 650~800+ (고품질 지표)
- 호텔급 편안함
- 정기 할인 (40~50% off)

**리뷰:**
- Millennium Magazine: https://millenniummagazine.com/home-decor/crown-goose-sweet-dreams-are-made-of-this/
- Casie Stewart: https://casiestewart.com/review-crown-goose-duvet-cover/

## 견적 추가 시 필수 정보

Crown Goose 견적을 추가할 때는 반드시 다음을 포함해야 합니다:

✅ **필수 필드:**
- 업체명: Crown Goose
- 제품 모델명
- 가격 (USD 단위)
- 제품 URL (en.crowngoose.com 또는 crowngooseusa.com)
- 상세 스펙 (온기 레벨, 필링, 사이즈 등)

✅ **필수 레퍼런스 (최소 2개):**
- Crown Goose 공식 제품 페이지
- 최소 1개 이상의 리뷰/매거진 기사

예시:
```json
{
  "references": [
    "https://en.crowngoose.com/products/grand-duke-goose-down-duvet",
    "https://millenniummagazine.com/home-decor/crown-goose-sweet-dreams-are-made-of-this/"
  ]
}
```

## 팁 💡

1. **가격 비교**: Crown Goose 제품들은 온기 레벨별로 가격이 다릅니다. 계절과 필요에 맞춰 선택하세요.
2. **할인 정보**: Crown Goose는 정기적으로 40~50% 할인을 제공합니다.
3. **호텔급 품질**: Fill Power 800+는 고급 호텔에서 사용하는 수준입니다.
4. **배송**: 미국 스토어(crowngooseusa.com)는 빠른 배송을 제공합니다.

---

데이터 저장 위치: `/data/quotes.json`의 `혼수/침구` 카테고리
