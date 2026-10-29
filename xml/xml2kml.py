import xml.etree.ElementTree as ET

class XMLtoKML:
    def __init__(self, archivo_xml, archivo_kml):
        self.archivo_xml = archivo_xml
        self.archivo_kml = archivo_kml
        self.ns = {'u': 'http://www.uniovi.es'}

    def parse_xml(self):
        try:
            arbol = ET.parse(self.archivo_xml)
        except IOError:
            print('No se encuentra el archivo', self.archivo_xml)
            exit()
        except ET.ParseError:
            print('Error procesando en el archivo XML =', self.archivo_xml)
            exit()
        return arbol

    def find_coordinates(self, arbol, xpath_expressions):
        coords = []
        raiz = arbol.getroot()
        
        for expresion in xpath_expressions:
            for hijo in raiz.findall(expresion, self.ns):
                # Swapped because XML tags have latitude and longitude values reversed
                lat = hijo.find('u:longitud', self.ns).text
                long = hijo.find('u:latitud', self.ns).text
                alt = hijo.find('u:altitud', self.ns).text
                coords.append({"long": long, "lat": lat, "alt": alt})
                
        return coords

    def add_placemark(self, doc, nombre, descripcion, long, lat, alt, modo_altitud):
        pm = ET.SubElement(doc, 'Placemark')
        ET.SubElement(pm, 'name').text = nombre
        ET.SubElement(pm, 'description').text = descripcion
        punto = ET.SubElement(pm, 'Point')
        ET.SubElement(punto, 'coordinates').text = '{},{},{}'.format(long, lat, alt)
        ET.SubElement(punto, 'altitudeMode').text = modo_altitud

    def add_line_string(self, doc, nombre, extrude, tesela, lista_coordenadas, modo_altitud, color, ancho):
        pm = ET.SubElement(doc, 'Placemark')
        ET.SubElement(pm, 'name').text = nombre
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls, 'extrude').text = extrude
        ET.SubElement(ls, 'tessellation').text = tesela
        ET.SubElement(ls, 'coordinates').text = lista_coordenadas
        ET.SubElement(ls, 'altitudeMode').text = modo_altitud 

        estilo = ET.SubElement(pm, 'Style')
        linea = ET.SubElement(estilo, 'LineStyle')
        ET.SubElement(linea, 'color').text = color
        ET.SubElement(linea, 'width').text = ancho

    def generate_kml(self):
        xml_arbol = self.parse_xml()
        
        xpaths = [
            'u:coordenadas', 
            'u:hitos/u:coordenadas',
            'u:puntos-anonimos/u:punto-anonimo/u:coordenadas'
        ]
        
        coordinates = self.find_coordinates(xml_arbol, xpaths)
        
        raiz = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        doc = ET.SubElement(raiz, 'Document')
        
        for i, coord in enumerate(coordinates):
            self.add_placemark(doc, f"Punto {i+1}", "Placemark", coord['long'], coord['lat'], coord['alt'], "relativeToGround")
        
        lista_coords = " ".join([f"{c['long']},{c['lat']},{c['alt']}" for c in coordinates])
        if lista_coords:
            self.add_line_string(doc, "Route", "1", "1", lista_coords, "relativeToGround", "ff0000ff", "5")

        arbol_kml = ET.ElementTree(raiz)
        ET.indent(arbol_kml)
        arbol_kml.write(self.archivo_kml, encoding='utf-8', xml_declaration=True)

def main():
    conversor = XMLtoKML("etapaEsquema.xml", "etapa.kml")
    conversor.generate_kml()

if __name__ == "__main__":
    main()