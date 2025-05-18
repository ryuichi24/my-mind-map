---
title: memory
markmap:
  colorFreezeLevel: 2
  maxWidth: 300
---

## Memory Cell

- 1 bit per cell
- 8 bits = 1 bytes
- 1 bytes per address
  - example
    - `0x77 = 119 in decimal`
      - "0x" is a prefix of hexadecimal
        - 1 digit has 16 possibilities
          - 2ˆ4 = 4 bits
      - 1st digit has 4 bits
      - 2nd digit has also 4 bits
      - `4 bits + 4 bits = 8bits = 1 bytes`

## Endianness

- Endianness refers to the byte order used to **represent multi-byte data types** (like integers) in memory.

  - different systems may use different byte orders

    - Big-Endian

      - Stores **the most significant byte** (the "big end") **at the smallest memory address**. This ordering aligns with how we typically write numbers in human-readable form, with **the most significant digit first**.

    - Little-Endian
      - Stores **the least significant byte** (the "little end") **at the smallest memory address.** This format is commonly used in x86 architectures, such as Intel and AMD processors.

  - examples
    - in Big-Endian 0x1234 are stored in memory like:
      - | Address | Value                         |
        | ------- | ----------------------------- |
        | 0       | 0x12 (most significant byte)  |
        | 1       | 0x34 (least significant byte) |
      - `0x1234 = (16ˆ3 * 1) + (16ˆ2 * 2) + (16ˆ1 * 3) + (16ˆ0 * 4) = 4,660`
      - 4660 as 16 bit value in decimal
    - in Little-Endian 0x1234 are stored in memory like:
      - | Address | Value                         |
        | ------- | ----------------------------- |
        | 0       | 0x34 (least significant byte) |
        | 1       | 0x12 (most significant byte)  |
      - `0x3412 = (16ˆ3 * 3) + (16ˆ2 * 4) + (16ˆ1 * 1) + (16ˆ0 * 2) = 13,330`
      - 13330 as 16 bit value in decimal
