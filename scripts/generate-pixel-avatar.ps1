param(
  [string]$PublicRoot = (Join-Path $PSScriptRoot "..\public\avatar")
)

Add-Type -AssemblyName System.Drawing

$width = 64
$height = 96
$transparent = [System.Drawing.Color]::Transparent

$palette = @{
  Outline = "#4A2026"
  OutlineSoft = "#71333A"
  SkinShadow = "#E8785D"
  SkinBase = "#FFAE7D"
  SkinLight = "#FFC18F"
  Eye = "#2D1717"
  EyeLight = "#D9D2CC"
  ClothOutline = "#596273"
  ClothShadow = "#C8CED6"
  ClothBase = "#F2F4F5"
  ClothLight = "#FFFFFF"
}

function New-Canvas {
  $bitmap = [System.Drawing.Bitmap]::new(
    $width,
    $height,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear($transparent)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
  return @{ Bitmap = $bitmap; Graphics = $graphics }
}

function Fill-Rect($graphics, [string]$color, [int]$x, [int]$y, [int]$w, [int]$h) {
  $brush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($color))
  $graphics.FillRectangle($brush, $x, $y, $w, $h)
  $brush.Dispose()
}

function Fill-Polygon($graphics, [string]$color, [int[]]$coordinates) {
  $points = [System.Collections.Generic.List[System.Drawing.Point]]::new()
  for ($index = 0; $index -lt $coordinates.Length; $index += 2) {
    $points.Add([System.Drawing.Point]::new($coordinates[$index], $coordinates[$index + 1]))
  }
  $brush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($color))
  $graphics.FillPolygon($brush, $points.ToArray())
  $brush.Dispose()
}

function Save-Canvas($canvas, [string]$path) {
  $directory = Split-Path -Parent $path
  New-Item -ItemType Directory -Force -Path $directory | Out-Null
  $canvas.Graphics.Dispose()
  $canvas.Bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $canvas.Bitmap.Dispose()
}

function Composite-Layers([string[]]$paths, [string]$outputPath) {
  $result = [System.Drawing.Bitmap]::new(
    $width,
    $height,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )
  foreach ($path in $paths) {
    $layer = [System.Drawing.Bitmap]::FromFile($path)
    for ($y = 0; $y -lt $height; $y++) {
      for ($x = 0; $x -lt $width; $x++) {
        $pixel = $layer.GetPixel($x, $y)
        if ($pixel.A -gt 0) {
          $result.SetPixel($x, $y, $pixel)
        }
      }
    }
    $layer.Dispose()
  }
  $directory = Split-Path -Parent $outputPath
  New-Item -ItemType Directory -Force -Path $directory | Out-Null
  $result.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $result.Dispose()
}

$body = New-Canvas

# Orelhas ficam atrás da cabeça.
Fill-Polygon $body.Graphics $palette.Outline @(15,23, 18,23, 18,21, 20,21, 20,32, 18,32, 18,34, 15,34, 15,32, 14,32, 14,25, 15,25)
Fill-Polygon $body.Graphics $palette.SkinShadow @(16,24, 19,24, 19,31, 18,31, 18,33, 16,33)
Fill-Rect $body.Graphics $palette.SkinBase 16 25 2 5
Fill-Polygon $body.Graphics $palette.Outline @(44,21, 46,21, 46,23, 49,23, 49,25, 50,25, 50,32, 49,32, 49,34, 46,34, 46,32, 44,32)
Fill-Polygon $body.Graphics $palette.SkinShadow @(45,24, 48,24, 48,33, 46,33, 46,31, 45,31)
Fill-Rect $body.Graphics $palette.SkinBase 46 25 2 5

# Cabeça neutra, simétrica e desenhada em degraus inteiros.
Fill-Polygon $body.Graphics $palette.Outline @(
  27,8, 37,8, 37,9, 40,9, 40,10, 42,10, 42,12, 44,12, 44,15,
  46,15, 46,20, 47,20, 47,33, 46,33, 46,35, 44,35, 44,37,
  42,37, 42,39, 38,39, 38,41, 26,41, 26,40, 23,40, 23,39,
  21,39, 21,37, 19,37, 19,35, 17,35, 17,33, 16,33, 16,20,
  18,20, 18,15, 20,15, 20,12, 22,12, 22,10, 25,10, 25,9, 27,9
)
Fill-Polygon $body.Graphics $palette.SkinBase @(
  28,10, 36,10, 36,11, 39,11, 39,12, 41,12, 41,14, 43,14, 43,17,
  45,17, 45,23, 46,23, 46,32, 44,32, 44,35, 41,35, 41,37,
  37,37, 37,39, 27,39, 27,38, 23,38, 23,37, 21,37, 21,35,
  19,35, 19,32, 18,32, 18,23, 19,23, 19,17, 21,17, 21,14,
  23,14, 23,12, 26,12, 26,11, 28,11
)
Fill-Rect $body.Graphics $palette.SkinLight 28 10 8 1
Fill-Rect $body.Graphics $palette.SkinLight 24 12 16 1
Fill-Rect $body.Graphics $palette.SkinLight 21 15 2 5
Fill-Rect $body.Graphics $palette.SkinShadow 18 24 1 8
Fill-Rect $body.Graphics $palette.SkinShadow 45 24 1 8
Fill-Rect $body.Graphics $palette.SkinShadow 20 33 2 2
Fill-Rect $body.Graphics $palette.SkinShadow 42 33 2 2
Fill-Rect $body.Graphics $palette.SkinShadow 23 37 4 1
Fill-Rect $body.Graphics $palette.SkinShadow 37 37 4 1

# Pescoço conectado ao tronco.
Fill-Polygon $body.Graphics $palette.Outline @(27,39, 37,39, 37,43, 39,43, 39,47, 25,47, 25,43, 27,43)
Fill-Rect $body.Graphics $palette.SkinShadow 28 40 8 6
Fill-Rect $body.Graphics $palette.SkinBase 29 40 6 5

# Braços contínuos, sem a fenda escura que aparecia na redução automática.
Fill-Polygon $body.Graphics $palette.Outline @(
  19,41, 23,42, 24,45, 24,56, 23,56, 23,63, 22,63, 22,67,
  20,67, 20,70, 15,70, 15,69, 13,69, 13,64, 14,64, 14,57,
  15,57, 15,48, 16,48, 16,44, 18,44, 18,42, 19,42
)
Fill-Polygon $body.Graphics $palette.SkinBase @(
  20,43, 22,43, 23,46, 23,56, 22,56, 22,62, 21,62, 21,66,
  19,66, 19,68, 15,68, 15,64, 16,64, 16,57, 17,57, 17,48,
  18,48, 18,44, 20,44
)
Fill-Rect $body.Graphics $palette.SkinLight 18 45 2 12
Fill-Rect $body.Graphics $palette.SkinShadow 15 57 2 7
Fill-Rect $body.Graphics $palette.SkinShadow 15 66 4 2

Fill-Polygon $body.Graphics $palette.Outline @(
  45,41, 41,42, 40,45, 40,56, 41,56, 41,63, 42,63, 42,67,
  44,67, 44,70, 49,70, 49,69, 51,69, 51,64, 50,64, 50,57,
  49,57, 49,48, 48,48, 48,44, 46,44, 46,42, 45,42
)
Fill-Polygon $body.Graphics $palette.SkinBase @(
  44,43, 42,43, 41,46, 41,56, 42,56, 42,62, 43,62, 43,66,
  45,66, 45,68, 49,68, 49,64, 48,64, 48,57, 47,57, 47,48,
  46,48, 46,44, 44,44
)
Fill-Rect $body.Graphics $palette.SkinLight 44 45 2 12
Fill-Rect $body.Graphics $palette.SkinShadow 47 57 2 7
Fill-Rect $body.Graphics $palette.SkinShadow 45 66 4 2

# Tronco e quadril completos por baixo das roupas.
Fill-Polygon $body.Graphics $palette.Outline @(21,41, 27,41, 27,43, 37,43, 37,41, 43,41, 43,44, 44,44, 44,61, 42,61, 42,68, 22,68, 22,61, 20,61, 20,44, 21,44)
Fill-Polygon $body.Graphics $palette.SkinBase @(22,43, 28,43, 28,45, 36,45, 36,43, 42,43, 42,45, 43,45, 43,60, 41,60, 41,67, 23,67, 23,60, 21,60, 21,45, 22,45)
Fill-Rect $body.Graphics $palette.SkinLight 24 44 4 1
Fill-Rect $body.Graphics $palette.SkinLight 36 44 4 1
Fill-Rect $body.Graphics $palette.SkinShadow 22 55 2 5
Fill-Rect $body.Graphics $palette.SkinShadow 40 55 2 5
Fill-Rect $body.Graphics $palette.SkinShadow 20 46 1 14
Fill-Rect $body.Graphics $palette.SkinShadow 43 46 1 14

# Pernas paralelas com vão real e pés largos voltados para frente.
Fill-Polygon $body.Graphics $palette.Outline @(24,65, 31,65, 31,84, 30,84, 30,87, 32,87, 32,90, 22,90, 22,87, 23,87, 23,84, 24,84)
Fill-Polygon $body.Graphics $palette.SkinBase @(25,66, 30,66, 30,83, 29,83, 29,86, 31,86, 31,88, 23,88, 23,87, 24,87, 24,83, 25,83)
Fill-Rect $body.Graphics $palette.SkinLight 25 67 2 16
Fill-Rect $body.Graphics $palette.SkinShadow 29 72 1 12
Fill-Rect $body.Graphics $palette.SkinShadow 24 86 5 2

Fill-Polygon $body.Graphics $palette.Outline @(33,65, 40,65, 40,84, 41,84, 41,87, 42,87, 42,90, 32,90, 32,87, 34,87, 34,84, 33,84)
Fill-Polygon $body.Graphics $palette.SkinBase @(34,66, 39,66, 39,83, 40,83, 40,87, 41,87, 41,88, 33,88, 33,86, 35,86, 35,83, 34,83)
Fill-Rect $body.Graphics $palette.SkinLight 34 67 2 16
Fill-Rect $body.Graphics $palette.SkinShadow 38 72 1 12
Fill-Rect $body.Graphics $palette.SkinShadow 35 86 5 2

$bodyPath = Join-Path $PublicRoot "base\body-base.png"
Save-Canvas $body $bodyPath

# Rosto mínimo em camada própria.
$face = New-Canvas
Fill-Rect $face.Graphics $palette.Eye 25 24 3 6
Fill-Rect $face.Graphics $palette.Eye 36 24 3 6
Fill-Rect $face.Graphics $palette.EyeLight 26 25 1 1
Fill-Rect $face.Graphics $palette.EyeLight 37 25 1 1
$facePath = Join-Path $PublicRoot "face\face-01.png"
Save-Canvas $face $facePath

# Roupa-base neutra, planejada para ser totalmente coberta.
$underwear = New-Canvas
Fill-Polygon $underwear.Graphics $palette.ClothOutline @(23,59, 41,59, 41,68, 40,68, 40,70, 34,70, 34,67, 33,67, 33,70, 31,70, 31,67, 30,67, 30,70, 24,70, 24,68, 23,68)
Fill-Polygon $underwear.Graphics $palette.ClothBase @(24,62, 40,62, 40,67, 38,67, 38,68, 34,68, 34,66, 30,66, 30,68, 26,68, 26,67, 24,67)
Fill-Rect $underwear.Graphics $palette.ClothOutline 24 59 16 3
Fill-Rect $underwear.Graphics $palette.ClothShadow 24 62 3 5
Fill-Rect $underwear.Graphics $palette.ClothShadow 37 62 3 5
Fill-Rect $underwear.Graphics $palette.ClothShadow 31 65 3 4
Fill-Rect $underwear.Graphics $palette.ClothLight 27 62 4 1
Fill-Rect $underwear.Graphics $palette.ClothLight 34 62 3 1
$underwearPath = Join-Path $PublicRoot "bottoms\base-underwear.png"
Save-Canvas $underwear $underwearPath

$masterPath = Join-Path $PublicRoot "master\master.png"
Composite-Layers @($bodyPath, $underwearPath, $facePath) $masterPath

foreach ($path in @($bodyPath, $facePath, $underwearPath, $masterPath)) {
  $check = [System.Drawing.Bitmap]::FromFile($path)
  if ($check.Width -ne $width -or $check.Height -ne $height) {
    throw "Dimensão inválida em $path"
  }
  $transparentPixels = 0
  for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
      $alpha = $check.GetPixel($x, $y).A
      if ($alpha -eq 0) {
        $transparentPixels++
      } elseif ($alpha -ne 255) {
        throw "Alpha parcial encontrado em $path na coordenada $x,$y"
      }
    }
  }
  if ($transparentPixels -eq 0) {
    throw "O asset precisa possuir fundo transparente: $path"
  }
  $check.Dispose()
}

Write-Output "Master Avatar manual gerado em grade 64 x 96."
