COUNT = 1

def draw(G1_text, G2_text, top_text, left_text, right_text, draw):
    global COUNT

    with open("cap" + `COUNT` + ".tex", "w") as f:
        f.write("\\input{preamble.tex}\n")
        f.write("\\begin{document}\n")
        f.write("\\capnet{%s}{%s}{%s}{%s}{%s}{%s}\n" % 
                (G1_text, G2_text, top_text, left_text, right_text, str(draw).lower()))
        f.write("\\end{document}\n")

        COUNT += 1

def main():
    draw("$v_0$", "$v_0$", "", "", "", True)
    
    draw("$v_0$", "$v_0$", "", "write $v_1$ $\\nwarrow$", "", True)
    draw("$v_1$", "$v_0$", "", "", "", True)
    draw("$v_0$", "$v_0$", "", "done $\searrow$", "", True)

    draw("$v_0$", "$v_0$", "", "", "", True)
    draw("$v_0$", "$v_0$", "", "", "", True)

if __name__ == "__main__":
    main()
